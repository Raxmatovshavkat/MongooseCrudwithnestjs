import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateRegisterDto } from './dto/register-user.dto';
import { CreateLoginDto } from './dto/login-user.dto ';
import { User } from './entities/user.entity';
import * as otpGenerator from 'otp-generator';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../Mail/mail.service';
import { OtpService } from 'src/otp/otp.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel:Model<User>,
    private readonly emailService: EmailService,
    private readonly otpService: OtpService
  ) { }

  async register(createUserDto: CreateRegisterDto) {
    const { password, email, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    const user = new this.userModel({
      ...rest,
      email,
      password: hashedPassword,
      status: 'inactive',
    });


    try {
      const savedUser = await user.save();
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
    const user = await this.userModel.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async logout(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    await user.destroy();
  }

  async updateStatus(userId: string, status: string): Promise<void> {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.status = status;
    await user.save();
    
  }
}
