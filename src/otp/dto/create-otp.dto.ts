import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOtpDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    @IsString()
    otp: string;
}
