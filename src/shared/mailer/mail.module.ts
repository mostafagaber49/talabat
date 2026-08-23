import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailService } from "./mail.service";


@Module({

imports: [
       MailerModule.forRootAsync({ 

inject : [ConfigService],
useFactory: (configservice : ConfigService) =>({
transport: {

host: configservice.get('mail').host,
port: configservice.get('mail').port,
auth : 
{
    user: configservice.get('mail').auth.user ,
    pass: configservice.get('mail').auth.pass
}

},
defaults: {from: " 'talabat' <mogabee99@gmail.com> "}



})


       })
],
providers:[MailService],
controllers:[],
exports:[MailService]

})
export class mailModule {}