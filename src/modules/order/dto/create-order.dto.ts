import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"
import { PaymentMethod } from "src/common/enum/payment.method.enum"

export class CreateOrderDto {

@IsMongoId()
@IsNotEmpty()
adress: string 

@IsString()
@IsEnum(PaymentMethod)
paymentMethod : PaymentMethod

@IsNumber()
@IsPositive()
@IsNotEmpty()
quantity : number 

@IsMongoId()
@IsNotEmpty()
product: string

}
