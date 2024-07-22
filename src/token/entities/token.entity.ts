import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Schema()
export class RefreshToken extends Model<RefreshToken> {
    @Prop()
    token: string;

    @Prop()
    userId: number;

    @Prop()
    expiryDate: Date 
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);