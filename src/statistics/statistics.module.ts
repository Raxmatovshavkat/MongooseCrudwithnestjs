import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Service } from '../services/entities/service.entity';
import { Order } from '../orders/entities/order.entity';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Service, Order])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule { }
