import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Usermongomodule } from 'src/shared/modules/user.mongo.module';
import { mailModule } from 'src/shared/mailer/mail.module';

@Module({
  imports: [ Usermongomodule ,mailModule, 
  JwtModule.registerAsync({
  inject : [ConfigService],
  useFactory:(configservice: ConfigService)=>({

    secret: configservice.get('jwt').accessSecret,
    signOptions: {expiresIn: '1d'}

  })})],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
