import { IsNotEmpty } from "class-validator"

export class CreateOrderDto {
    @IsNotEmpty()
    userId: number
    @IsNotEmpty()
    serviceId: number
    @IsNotEmpty()
    status: string
}
