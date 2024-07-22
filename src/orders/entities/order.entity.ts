import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Model } from "mongoose";

export enum Role {
    Pending = 'pending',
    Completed = 'completed',
    Cancelled = 'cancelled'
}

@Schema()
export class Order extends Model{
    @Prop({type:mongoose.Schema.ObjectId,ref:'User'})
    userId:string

    @Prop({ type: mongoose.Schema.ObjectId, ref: 'Service' })
    serviceId:string

    @Prop({type:String,enum:Role,default:Role.Pending})
    status:string
  
}

export const OrderSchema = SchemaFactory.createForClass(Order);
