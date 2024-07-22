import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateLoginDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}
