import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Schema()
export class Service extends Model{
    @Prop()
    name:string

    @Prop()
    description:string

    @Prop()
    price:number

}

export const ServiceSchema = SchemaFactory.createForClass(Service);