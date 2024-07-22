import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from './entities/service.entity';
import { Model } from 'mongoose';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service.name) private readonly serviceModul:Model<Service>){}
 async create(createServiceDto: CreateServiceDto) {
    try {
      const service=await new this.serviceModul(createServiceDto).save()
      return service
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findAll() {
    try {
      const service=await this.serviceModul.find()
      if(!service){
        throw new NotFoundException()
      }
      return service
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: string ) {
   try {
     const service=await this.serviceModul.findById(id)
     if (!service){
      throw new NotFoundException()
     }
     return service
   } catch (error) {
     throw new InternalServerErrorException()
   }

  }

  async update(id: string , updateServiceDto: UpdateServiceDto) {
    try {
      const service = await this.serviceModul.findById(id)
      if (!service) {
        throw new NotFoundException()
      }
      return service.updateOne({$where:{id}})
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async remove(id: string ) {
    try {
      const service = await this.serviceModul.findById(id)
      if (!service) {
        throw new NotFoundException()
      }
      return service.deleteOne()
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
