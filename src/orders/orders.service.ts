import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private readonly orderService:Model<Order>){}
 async create(createOrderDto: CreateOrderDto) {
    return await new this.orderService(createOrderDto).save();
  }

  async findAll({page,limit}:{page:number;limit:number}) {
    try {
      const result=await this.orderService
      .find()
      .skip((page-1)*limit)
      .limit(limit)
      .exec();
  
      const total=await this.orderService.countDocuments();
      return {
        data:result,
        count:total,
        currentPage:page,
        totalPages:Math.ceil(total/limit)
      }
    } catch (error) {
      throw new error.message
    }

  }

  async findOne(id: string) {
    try {
      const order= this.orderService.findById(id);
      if (!order){
        throw new NotFoundException()
      }
      return order
    } catch (error) {
      throw new error.message
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
   try {
     const order=await this.orderService.findById(id)
     if(!order){
       throw new NotFoundException()
     }
     return order.updateOne(updateOrderDto)
   } catch (error) {
     throw new error.message
   }
  }

  async remove(id: string) {
    try {
      const order = await this.orderService.findById(id)
      if (!order) {
        throw new NotFoundException()
      }
      return order.deleteOne()
    } catch (error) {
      throw new error.message
    }
  }
}
