import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
constructor(private readonly mailerservice: MailerService){}

async send(options : ISendMailOptions){

     return await this.mailerservice.sendMail(options)
}

}