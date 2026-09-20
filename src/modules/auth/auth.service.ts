import { BadGatewayException, BadRequestException, ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { CustomerRepository } from 'src/models/customer/customer.repository';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/shared/mailer/mail.service';
import { Otp } from 'src/common/services/otp.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';
import { Customer } from 'src/models/customer/customer.schema';
import { BcryptService } from 'src/shared/bcrybt/bcrybt.service';
import { VerifyAccountDto } from './dto/verifyaccount.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { SendOtpDto } from './dto/sendotp.dto';

@Injectable()
export class AuthService {

constructor(
    private readonly customerrepository: CustomerRepository,
    private readonly mailservice: MailService,
    @Inject(CACHE_MANAGER)   private readonly cachemanager : Cache,
    private readonly jwtservice : JwtService,
    private readonly bcrybtservice:BcryptService 
           ){}

async register(registerdto : RegisterDto){

const user = await this.customerrepository.getOne({email: registerdto.email})

if(user) throw new ConflictException('user already exist')
 

registerdto.password = await this.bcrybtservice.hash(registerdto.password)

const otp = Otp()
await this.mailservice.send({


to: registerdto.email,
subject : 'verify your account',
html :  ` <p> your otp to verify your account ${otp} </p>`


})

await this.cachemanager.set(`otp ${registerdto.email}`, otp, 5*60*1000)
await this.cachemanager.set(registerdto.email, registerdto, 5*60*1000)


// return await this.customerrepository.create(registerdto)

return {message: 'otp send, please verify your account'}

}


async login(logindto : LoginDto){

const userexist = await this.customerrepository.getOne({email: logindto.email})

if (!userexist) throw new NotFoundException('invalid email or password')

    const isPasswordValid = await this.bcrybtservice.compare(logindto.password, userexist.password);
    if (!isPasswordValid) {
    throw new UnauthorizedException('invalid email or password');
  }
  
 const accesstoken =  this.jwtservice.sign({sub: userexist._id, type: 'access'},{ expiresIn: '15m' })
 const refreshtoken =  this.jwtservice.sign({sub : userexist._id, type: 'refresh'},{ expiresIn: '7d' })

 return {accesstoken , refreshtoken}

}


async verifyaccount (verifyAccountDto: VerifyAccountDto){

    const user = await this.cachemanager.get<VerifyAccountDto>(verifyAccountDto.email)
    if(!user) {throw new NotFoundException('user not found')}

    const otp = await this.cachemanager.get(`otp ${verifyAccountDto.email}`)
    if(!otp) {throw new BadRequestException('expire otp')}

    if(otp !== verifyAccountDto.otp) {
        throw new BadRequestException('invalid otp') }

    const usercreated = await this.customerrepository.create(user)

    await this.cachemanager.del(verifyAccountDto.email)
    await this.cachemanager.del(`otp ${verifyAccountDto.email}`)

    return usercreated
}   

async resetpassword(resetPasswordDto : ResetPasswordDto){

    const user = await this.customerrepository.getOne({email : resetPasswordDto.email})
    if(!user) {throw new BadRequestException('invalid or expired otp')}

    const otp = await this.cachemanager.get(`otp ${resetPasswordDto.email}`)
    if(!otp) {throw new BadRequestException('expire otp')}

    if(otp !== resetPasswordDto.otp){throw new BadRequestException('invald otp')}

    resetPasswordDto.newPassword = await this.bcrybtservice.hash(resetPasswordDto.newPassword)

    await this.customerrepository.updateOne(
        {email: resetPasswordDto.email},
        {password: resetPasswordDto.newPassword}
    )

    await this.cachemanager.del(`otp ${resetPasswordDto.email}`)
    return { message: 'password reset successfully' }

}

async sendotp(sendOtpDto: SendOtpDto){

   const emailexist = await this.customerrepository.getOne({email : sendOtpDto.email}) 
   const email = await this.cachemanager.get(sendOtpDto.email)

    if(!email && !emailexist) { throw new NotFoundException('user not found')}

    const otp = await this.cachemanager.get(`otp ${sendOtpDto.email}`)

    if(otp){ throw new BadRequestException('already have a valid otp')}

    const generatedOtp = Otp()
    await this.mailservice.send({

        to: sendOtpDto.email,
        subject : 'otp',
        html :  ` <p> your otp to reset password ${generatedOtp} </p>`

    })

        await this.cachemanager.set(`otp ${sendOtpDto.email}`, generatedOtp, 5 * 60 * 1000)
        return { message: 'OTP sent successfully' }

}
}
