import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { OrdersModule } from './orders/orders.module';

import { ConfigModule } from '@nestjs/config';
import { OtpModule } from './otp/otp.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenModule } from './token/token.module';

const mongo_uri=process.env.MONGO_URI
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(mongo_uri),
    UserModule,
    AuthModule,
    ServicesModule,
    OrdersModule,
    OtpModule,
    RefreshTokenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }