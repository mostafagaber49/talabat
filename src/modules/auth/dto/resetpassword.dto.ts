import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'NewTest@12345' })
  @IsStrongPassword()
  @IsNotEmpty()
  newPassword!: string;

  @ApiProperty({ example: '123456' })
  @IsNumberString()
  @Length(6, 6)
  @IsNotEmpty()
  otp!: string;
}