// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { Model } from "mongoose";

export enum Roles {
    User="user",
    Admin="admin"
}

export enum Status {
    Active="active",
    Inactive="inactive"
}
import { Order } from 'src/orders/entities/order.entity';
// @Schema()
// export class User extends Model<User> {
//     @Prop({ allowNull: false })
//     firstname: string;

//     @Prop({ allowNull: false })
//     lastname: string;

//     @Prop({allowNull:false,unique:true})
//     email: string;

//     @Prop()
//     password: string;

//     @Prop()
//     confirmPassword: string;

//     @Prop({ type: String, enum: Roles, default: Roles.User })
//     role: string

//     @Prop({ type: String, enum: Status, default: Status.Inactive })
//     status: string

// }

// export const UserSchema = SchemaFactory.createForClass(User);

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: String, enum: Roles, default: Roles.User })
    role:string

    @Column({type:String,enum:Status,default:Status.Inactive})
    status: string;


    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}
