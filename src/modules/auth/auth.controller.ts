import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { verifyAccountDto } from './dto/verifyaccount.dto';
import { resetPasswordDto } from './dto/resetpassword.dto';
import { sendOtpDto } from './dto/sendotp.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Post('register')
  async register(@Body() registerdto: registerDto){

   const usercreated =  await this.authService.register(registerdto)

   return {
     data : {usercreated} ,
     success : true,
     message : 'user created successfully'
            
  }
  }


  @Post('login')
  async login(@Body() logindto: loginDto) {
    const result = await this.authService.login(logindto);

    return {
      message: 'Login successfully',
      success: true,
      data: result, // { accesstoken, refreshtoken }
    };
  }

  @Post('/verifyaccount')
  async verifyaccount(@Body() verifyaccount: verifyAccountDto){

    const account = await this.authService.verifyaccount(verifyaccount)

    return {

      message: 'user verified successfuly',
      success: true,
      data : {account}
    }
  }

  @Patch('resetpassword')
  async resetPassword(@Body() restepasswordDto: resetPasswordDto) {
    const result = await this.authService.resetpassword(restepasswordDto);

    return {
      success: true,
      data: result,
      message : result.message
    };
  }


  @Post('sendotp')
  async sendOtp(@Body() sendotpDto: sendOtpDto) {
    const result = await this.authService.sendotp(sendotpDto);

    return {
      message: result.message,
      success: true,
      data: result ,
    };
  }

}
