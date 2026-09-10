import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { VerifyAccountDto } from './dto/verifyaccount.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { SendOtpDto } from './dto/sendotp.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Post('register')
  async register(@Body() registerdto: RegisterDto){

   const usercreated =  await this.authService.register(registerdto)

   return {
     data : {usercreated} ,
     success : true,
     message : 'user created successfully'
            
  }
  }


  @Post('login')
  async login(@Body() logindto: LoginDto) {
    const result = await this.authService.login(logindto);

    return {
      message: 'Login successfully',
      success: true,
      data: result, // { accesstoken, refreshtoken }
    };
  }

  @Post('/verifyaccount')
  async verifyaccount(@Body() verifyAccountDto: VerifyAccountDto){

    const account = await this.authService.verifyaccount(verifyAccountDto)

    return {

      message: 'user verified successfuly',
      success: true,
      data : {account}
    }
  }

  @Patch('resetpassword')
  async resetPassword(@Body() resetepasswordDto: ResetPasswordDto) {
    const result = await this.authService.resetpassword(resetepasswordDto);

    return {
      success: true,
      data: result,
      message : result.message
    };
  }


  @Post('sendotp')
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    const result = await this.authService.sendotp(sendOtpDto);

    return {
      message: result.message,
      success: true,
      data: result ,
    };
  }

}
