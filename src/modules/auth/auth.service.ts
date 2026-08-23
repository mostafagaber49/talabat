import { BadGatewayException, BadRequestException, ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { CustomerRepository } from 'src/models/customer/customer.repository';
import { loginDto } from './dto/login.dto';
import { MailService } from 'src/shared/mailer/mail.service';
import { Otp } from 'src/common/services/otp.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';
import { Customer } from 'src/models/customer/customer.schema';
import { BcryptService } from 'src/shared/bcrybt/bcrybt.service';
import { verifyAccountDto } from './dto/verifyaccount.dto';
import { resetPasswordDto } from './dto/resetpassword.dto';
import { sendOtpDto } from './dto/sendotp.dto';

@Injectable()
export class AuthService {

constructor(
    private readonly customerrepository: CustomerRepository,
    private readonly mailservice: MailService,
    @Inject(CACHE_MANAGER)   private readonly cachemanager : Cache,
    private readonly jwtservice : JwtService,
    private readonly bcrybtservice:BcryptService 
           ){}

async register(registerdto : registerDto){

const user = await this.customerrepository.getOne({email: registerdto.email})

if(user) throw new ConflictException('user already exist')
 

registerdto.password = await this.bcrybtservice.hash(registerdto.password)
await this.mailservice.send({

to: registerdto.email,
subject : 'verify your account',
html :  ` <p> your otp to verify your account ${Otp()} </p>`


})

await this.cachemanager.set(`otp ${registerdto.email}`, Otp())
await this.cachemanager.set(registerdto.email, registerDto)


// return await this.customerrepository.create(registerdto)

}


async login(logindto : loginDto){

const userexist = await this.customerrepository.getOne({email: logindto.email})

if (!userexist) throw new NotFoundException('user not found')

    const isPasswordValid = await this.bcrybtservice.compare(logindto.password, userexist.password);
    if (!isPasswordValid) {
    throw new UnauthorizedException('invalid email or password');
  }
  
 const accesstoken = await this.jwtservice.sign({sub: userexist._id},{ expiresIn: '15m' })
 const refreshtoken = await this.jwtservice.sign({sub : userexist._id},{ expiresIn: '7d' })

 return {accesstoken , refreshtoken}

}


async verifyaccount (verifyaccountDto: verifyAccountDto){

    const user = await this.cachemanager.get<registerDto>(verifyaccountDto.email)
    if(!user) {throw new NotFoundException('user not found')}

    const otp = await this.cachemanager.get(`otp ${verifyaccountDto.email}`)
    if(!otp) {throw new BadRequestException('expire otp')}

    if(otp != verifyaccountDto.otp) {
        throw new BadRequestException('invalid otp') }

    const usercreated = await this.customerrepository.create(user)

    await this.cachemanager.del(verifyaccountDto.email)
    await this.cachemanager.del(`otp ${verifyaccountDto.email}`)

    return usercreated
}   

async resetpassword(restepasswordDto : resetPasswordDto){

    const user = await this.customerrepository.getOne({email : restepasswordDto.email})
    if(!user) {throw new NotFoundException('user not found')}

    const otp = await this.cachemanager.get(`otp ${restepasswordDto.email}`)
    if(!otp) {throw new BadRequestException('expire otp')}

    if(otp != restepasswordDto.otp){throw new BadRequestException('invald otp')}

    restepasswordDto.newPassword = await this.bcrybtservice.hash(restepasswordDto.newPassword)

    await this.customerrepository.updateOne(
        {email: restepasswordDto.email},
        {password: restepasswordDto.newPassword}
    )

    await this.cachemanager.del(`otp ${restepasswordDto.email}`)
    return { message: 'password reset successfully' }

}

async sendotp(sendotp: sendOtpDto){

   const emailexist = await this.customerrepository.getOne({email : sendotp.email}) 
   const email = await this.cachemanager.get(sendotp.email)

    if(!email && !emailexist) { throw new NotFoundException('user not found')}

    const otp = await this.cachemanager.get(`otp ${sendotp.email}`)

    if(otp){ throw new BadRequestException('already have a valid otp')}

    const generatedOtp = Otp()
    await this.mailservice.send({

        to: sendotp.email,
        subject : 'otp',
        html :  ` <p> your otp to reset password ${generatedOtp} </p>`

    })

        await this.cachemanager.set(`otp ${sendotp.email}`, generatedOtp, 5 * 60 * 1000)
        return { message: 'OTP sent successfully' }

}

    


}
