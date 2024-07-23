import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) { }

  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = this.orderRepository.create(createOrderDto);
      return await this.orderRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  async findAll({ page, limit }: { page: number; limit: number }) {
    try {
      const [data, count] = await this.orderRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        data,
        count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch orders');
    }
  }

  async findOne(id: number) {
    try {
      const order = await this.orderRepository.findOne({where:{id}});
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return order;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch order');
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.orderRepository.preload({
        id: +id,
        ...updateOrderDto,
      });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return await this.orderRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update order');
    }
  }

  async remove(id: number) {
    try {
      const order = await this.findOne(id);
      return await this.orderRepository.remove(order);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete order');
    }
  }
}
