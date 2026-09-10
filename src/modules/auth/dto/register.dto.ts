import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, Validate } from "class-validator"
import { MatchConfirmPassword } from "src/common/validation/matchpassword.validation"

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    userName! : string

    @IsPhoneNumber('EG')
    phoneNumber! : string

    @IsEmail()
    @IsNotEmpty()
    email : string 

    @IsStrongPassword()
    @IsNotEmpty()
    @IsString()
    password! : string

    @Validate(MatchConfirmPassword) // 👈 بتنادي الـ Custom Validator هنا
    confirmPassword: string;

    
}