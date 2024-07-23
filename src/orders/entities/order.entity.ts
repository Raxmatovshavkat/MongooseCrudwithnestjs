// import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { Model } from "mongoose";

export enum Role {
    Pending = 'pending',
    Completed = 'completed',
    Cancelled = 'cancelled'
}

import { Service } from 'src/services/entities/service.entity';
import { User } from 'src/user/entities/user.entity';
// @Schema()
// export class Order extends Model{
//     @Prop({type:mongoose.Schema.ObjectId,ref:'User'})
//     userId:string

//     @Prop({ type: mongoose.Schema.ObjectId, ref: 'Service' })
//     serviceId:string

//     @Prop({type:String,enum:Role,default:Role.Pending})
//     status:string
  
// }

// export const OrderSchema = SchemaFactory.createForClass(Order);


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({
    name:"orders"
})

export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;  

    @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    serviceId: number;

    @ManyToOne(() => User, (service) => service.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'serviceId' })
    service: Service;


    @Column({type:String,enum:Role,default:Role.Pending})
    status:string
}

