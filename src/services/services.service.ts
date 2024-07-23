import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(@InjectRepository(Service) private readonly serviceModul: Repository<Service>) { }
  async create(createServiceDto: CreateServiceDto) {
    try {
      const service = await this.serviceModul.create({ ...createServiceDto })
      return this.serviceModul.save(service)
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findAll() {
    try {
      const service = await this.serviceModul.find()
      if (!service) {
        throw new NotFoundException()
      }
      return service
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: number) {
    try {
      const service = await this.serviceModul.findOne({ where: { id } })
      if (!service) {
        throw new NotFoundException()
      }
      return service
    } catch (error) {
      throw new InternalServerErrorException()
    }

  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      const service = await this.serviceModul.findOne({ where: { id } })
      if (!service) {
        throw new NotFoundException()
      }
      Object.assign(service,updateServiceDto)
      return this.serviceModul.save(service)
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async remove(id: number) {
    try {
      const service = await this.serviceModul.findOne({ where: { id } })
      if (!service) {
        throw new NotFoundException()
      }
      return this.serviceModul.remove(service)
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
