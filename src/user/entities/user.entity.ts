import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model } from "mongoose";

export enum Roles {
    User="user",
    Admin="admin"
}

export enum Status {
    Active="active",
    Inactive="inactive"
}
@Schema()
export class User extends Model<User> {
    @Prop({ allowNull: false })
    firstname: string;

    @Prop({ allowNull: false })
    lastname: string;

    @Prop({allowNull:false,unique:true})
    email: string;

    @Prop()
    password: string;

    @Prop()
    confirmPassword: string;

    @Prop({ type: String, enum: Roles, default: Roles.User })
    role: string

    @Prop({ type: String, enum: Status, default: Status.Inactive })
    status: string

}

export const UserSchema = SchemaFactory.createForClass(User);
