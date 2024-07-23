import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Service } from '../services/entities/service.entity';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Service) private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
  ) { }

  async getStatistics() {
    const totalUsers = await this.userRepository.count();
    const totalServices = await this.serviceRepository.count();
    const totalOrders = await this.orderRepository.count();
    const ordersByStatus = await this.orderRepository
      .createQueryBuilder('order')
      .select('order.status, COUNT(order._id) as count')
      .groupBy('order.status')
      .getRawMany();

    return {
      totalUsers,
      totalServices,
      totalOrders,
      ordersByStatus,
    };
  }
}
