import { Injectable, NotFoundException, UnauthorizedException, Logger } from '@nestjs/common';
import { Otp } from './entities/otp.entity';
import { CreateOtpDto } from './dto/create-otp.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(@InjectModel(Otp.name) private readonly otpModel: Model<Otp>) { }

  async findOtpByUserIdAndOtp(userId: number, otp: string): Promise<Otp | null> {
    if (!userId) {
      this.logger.error('userId is undefined');
      throw new Error('userId is undefined');
    }
    this.logger.log(`Finding OTP for userId: ${userId}`);
    return await this.otpModel.findOne({ where: { userId, otp } });
  }

  async saveOtp(createOtpDto: CreateOtpDto) {
    this.logger.log(`Saving OTP for userId: ${createOtpDto.userId}`);
    return await this.otpModel.create(createOtpDto);
  }

  async remove(id: number): Promise<void> {
    const otp = await this.otpModel.findById(id);
    if (!otp) {
      this.logger.error('OTP not found');
      throw new NotFoundException('OTP not found');
    }
    await otp.destroy();
    this.logger.log(`OTP with id ${id} removed`);
  }

  async verifyOtp(userId: number, otp: string): Promise<void> {
    this.logger.log(`Verifying OTP for userId: ${userId}`);
    const savedOtp = await this.findOtpByUserIdAndOtp(userId, otp);
    if (!savedOtp) {
      throw new UnauthorizedException('Invalid OTP');
    }
    await this.remove(savedOtp.id);
  }
}
