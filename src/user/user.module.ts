import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { OtpModule } from 'src/otp/otp.module';
import { MailModule } from 'src/Mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/mail/mail.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MailModule,
    OtpModule],
  controllers: [],
  providers: [UserService,EmailService],
  exports: [UserService]
})
export class UserModule { }
