import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ispublic } from './common/decorators/public.decorator';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ispublic()
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'API is running' })
  getHello(): string {
    return this.appService.getHello();
  }
}