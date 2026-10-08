import {IsEmail,IsNotEmpty,IsNumberString,Length} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class VerifyAccountDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 6)
  otp!: string;
}