import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Schema()
export class Otp extends Model<Otp> {
    @Prop() 
    userId: number;

    @Prop()
    otp: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);