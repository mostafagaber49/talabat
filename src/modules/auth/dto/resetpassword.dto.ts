import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"

export class ResetPasswordDto{

@IsEmail()
@IsNotEmpty()
email : string

@IsStrongPassword()
@IsNotEmpty()
newPassword: string


@IsStrongPassword()
@IsNotEmpty()
otp: string

}