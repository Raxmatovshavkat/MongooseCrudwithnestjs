// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { Model } from "mongoose";
import { Order } from "src/orders/entities/order.entity";
import { OneToMany } from "typeorm";

// @Schema()
// export class Service extends Model{
//     @Prop()
//     name:string

//     @Prop()
//     description:string

//     @Prop()
//     price:number

//     @OneToMany(() => Order, (order) => order.service)
//     orders: Order[];
// }

// export const ServiceSchema = SchemaFactory.createForClass(Service);

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
    name: "services"
})

export class Service {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @OneToMany(() => Order, (order) => order.service)
    orders: Order[];
}