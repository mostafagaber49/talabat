import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { VerifyAccountDto } from './dto/verifyaccount.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { SendOtpDto } from './dto/sendotp.dto';
import { LoginDto } from './dto/login.dto';
import {ApiOperation,ApiResponse,ApiTags} from '@nestjs/swagger';
import { ispublic } from 'src/common/decorators/public.decorator';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  @ispublic()
  @ApiOperation({ summary: 'Register a new customer' })
  @ApiResponse({ status: 201, description: 'OTP sent successfully' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(@Body() registerdto: RegisterDto){

   const usercreated =  await this.authService.register(registerdto)

   return {
     data : {usercreated} ,
     success : true,
     message : 'user created successfully'
            
  }
  }


  @Post('login')
  @ispublic()
  @ApiOperation({ summary: 'Login customer' })
  @ApiResponse({ status: 201, description: 'Login successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() logindto: LoginDto) {
    const result = await this.authService.login(logindto);

    return {
      message: 'Login successfully',
      success: true,
      data: result, // { accesstoken, refreshtoken }
    };
  }

  @Post('/verifyaccount')
  @ispublic()
  @ApiOperation({ summary: 'Verify customer account using OTP' })
  async verifyaccount(@Body() verifyAccountDto: VerifyAccountDto){

    const account = await this.authService.verifyaccount(verifyAccountDto)

    return {

      message: 'user verified successfuly',
      success: true,
      data : {account}
    }
  }

  @Patch('resetpassword')
  @ispublic()
  @ApiOperation({ summary: 'Reset customer password' })
  async resetPassword(@Body() resetepasswordDto: ResetPasswordDto) {
    const result = await this.authService.resetpassword(resetepasswordDto);

    return {
      success: true,
      data: result,
      message : result.message
    };
  }


  @Post('sendotp')
  @ispublic()
  @ApiOperation({ summary: 'Send OTP' })
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    const result = await this.authService.sendotp(sendOtpDto);

    return {
      message: result.message,
      success: true,
      data: result ,
    };
  }

}
