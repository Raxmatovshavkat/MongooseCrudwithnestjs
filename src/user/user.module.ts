import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from './entities/user.entity';
import { OtpModule } from 'src/otp/otp.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from 'src/Mail/mail.module';


@Module({
  imports: [
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    MailModule,
    OtpModule],
  controllers: [],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
