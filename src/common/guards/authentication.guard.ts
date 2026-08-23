import { BadRequestException, CanActivate } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC } from "../decorators/public.decorator";

export class AuthGuard implements CanActivate{

constructor(
    private readonly jwtService: JwtService,
    private readonly reflector : Reflector

){}

canActivate(context: ExecutionContextHost){


    this.reflector.getAllAndOverride(IS_PUBLIC ,
     [ context.getHandler,
       context.getClass]
     )


const request = context.switchToHttp().getRequest()
const authorization = request.headers.authorization
if (!authorization ) throw new BadRequestException('tokin is missing')

    const token = authorization.split('')[1]
    request.user = this.jwtService.verify(token)
    return true 

}


}


