import { IsNotEmpty } from "class-validator"

export class CreateOrderDto {
    @IsNotEmpty()
    userId: string
    @IsNotEmpty()
    serviceId: string
    @IsNotEmpty()
    status: string
}
