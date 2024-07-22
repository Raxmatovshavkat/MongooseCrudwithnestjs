import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Otp, OtpSchema } from './entities/otp.entity';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports:[MongooseModule.forFeature([{name:Otp.name,schema:OtpSchema}])],
  providers: [OtpService],
  exports:[OtpService]
})
export class OtpModule {}
