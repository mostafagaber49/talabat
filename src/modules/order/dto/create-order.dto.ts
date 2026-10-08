import {IsEnum,IsMongoId,IsNotEmpty,IsNumber,IsPositive} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from 'src/common/enum/payment.method.enum';

export class CreateOrderDto {
  @ApiProperty({example: '66c123456789abcdef123456'})
  @IsMongoId()
  @IsNotEmpty()
  adress!: string

  @ApiProperty({enum: PaymentMethod,example: PaymentMethod.COD})
  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity!: number

  @ApiProperty({example: '66c123456789abcdef123456'})
  @IsMongoId()
  @IsNotEmpty()
  product!: string
}