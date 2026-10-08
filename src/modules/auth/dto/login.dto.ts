import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

    @ApiProperty({example: 'user@example.com'})
    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsNotEmpty()
    @ApiProperty({example: 'Test@12345'})
    @IsStrongPassword()
    password! : string
}