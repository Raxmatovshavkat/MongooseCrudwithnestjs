import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateRegisterDto } from './dto/register-user.dto';
import { CreateLoginDto } from './dto/login-user.dto ';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as otpGenerator from 'otp-generator';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../mail/mail.service';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
    private readonly otpService: OtpService,
  ) { }

  async register(createUserDto: CreateRegisterDto) {
    const { password, email, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    const user = this.userRepository.create({
      ...rest,
      email,
      password: hashedPassword,
      status: 'inactive',
    });

    try {
      const savedUser = await this.userRepository.save(user);
      await this.emailService.sendEmail(email, otp);
      await this.otpService.saveOtp({ userId: savedUser.id, otp });
      return savedUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Failed to register user');
    }
  }

  async signin(createLoginDto: CreateLoginDto) {
    const { email, password } = createLoginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({where:{id}});
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async logout(id: number | any) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    await this.userRepository.remove(user);
  }

  async updateStatus(userId: number, status: string): Promise<void> {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.status = status;
    await this.userRepository.save(user);
  }
}
