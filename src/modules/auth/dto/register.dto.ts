import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, Validate } from "class-validator"
import { MatchConfirmPassword } from "src/common/validation/matchpassword.validation"

export class RegisterDto {

    @ApiProperty({ example: 'Mostafa' })
    @IsString()
    @IsNotEmpty()
    userName! : string

    @ApiProperty({ example: '01012345678' })
    @IsPhoneNumber('EG')
    phoneNumber! : string

    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email : string 

    @ApiProperty({ example: 'Test@12345' })
    @IsStrongPassword()
    @IsNotEmpty()
    @IsString()
    password! : string

    @ApiProperty({ example: 'Test@12345' })
    @Validate(MatchConfirmPassword) // 👈 بتنادي الـ Custom Validator هنا
    confirmPassword: string;

    
}