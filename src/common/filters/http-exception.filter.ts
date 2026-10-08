import {ArgumentsHost,Catch,ExceptionFilter,HttpException,HttpStatus} from '@nestjs/common';
// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
// } from '@nestjs/common';
// import { Request, Response } from 'express';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus();
//     const stack = exception.stack;

//     response.status(status).json({
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       stack,
//     });
//   }
// }

import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter
  implements ExceptionFilter
{
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response =
      ctx.getResponse<Response>();

    const request =
      ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : null;

    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse &&
              typeof exceptionResponse === 'object' &&
              'message' in exceptionResponse
            ? exceptionResponse.message
            : 'Internal server error',
    });
  }
}