import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenModule } from 'src/token/token.module';
import { MailModule } from '../Mail/mail.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports:[UserModule,
    RefreshTokenModule,
    MailModule,
    OtpModule,
    JwtModule.register({
      global:true
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
