import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/db';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { OrdersModule } from './orders/orders.module';
import { OtpModule } from './otp/otp.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { HealthController } from './health-check/health-check.controller';
import { StatisticsModule } from './statistics/statistics.module';

const mongo_uri=process.env.MONGO_URI
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    databaseConfig,
    // MongooseModule.forRoot(mongo_uri),
    UserModule,
    AuthModule,
    ServicesModule,
    OrdersModule,
    OtpModule,
    RefreshTokenModule,
    TerminusModule,
    StatisticsModule
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule { }
