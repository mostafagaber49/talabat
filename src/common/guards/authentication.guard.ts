import {CanActivate,ExecutionContext,Injectable,UnauthorizedException,} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC } from '../decorators/public.decorator';


// import { BadRequestException, CanActivate } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
// import { JwtService } from "@nestjs/jwt";
// import { IS_PUBLIC } from "../decorators/public.decorator";

// export class AuthGuard implements CanActivate{

// constructor(
//     private readonly jwtService: JwtService,
//     private readonly reflector : Reflector

// ){}

// canActivate(context: ExecutionContextHost){


//     this.reflector.getAllAndOverride(IS_PUBLIC ,
//      [ context.getHandler,
//        context.getClass]
//      )


// const request = context.switchToHttp().getRequest()
// const authorization = request.headers.authorization
// if (!authorization ) throw new BadRequestException('tokin is missing')

//     const token = authorization.split('')[1]
//     request.user = this.jwtService.verify(token)
//     return true 

// }
// }

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest()

    const authorization = request.headers.authorization

    if (!authorization) {
      throw new UnauthorizedException('Authorization token is missing')
    }

    const [type, token] = authorization.split(' ')

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        'Authorization header must use Bearer token',
      );
    }

    try {
      request.user = this.jwtService.verify(token)

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token')
    }
  }
}
