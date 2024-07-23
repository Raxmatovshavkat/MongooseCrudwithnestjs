import * as dotenv from "dotenv";
dotenv.config();
console.log({
    DATABASE_TYPE: process.env.DATABASE_TYPE,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT_DB,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_DATABASE: process.env.DATABASE_DATABASE,
    DATABASE_SYNCHRONIZE: process.env.DATABASE_SYNCHRONIZE,
});


import { Otp } from '../otp/entities/otp.entity';
import { Order } from '../orders/entities/order.entity';
import { Service } from "src/services/entities/service.entity";
import Mail from "nodemailer/lib/mailer";
import { RefreshToken } from "src/token/entities/token.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";

export const databaseConfig = TypeOrmModule.forRoot({
    type: process.env.DATABASE_TYPE as any,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities: [User, Otp, Order, Service, Mail, RefreshToken],
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    logging: false
});

