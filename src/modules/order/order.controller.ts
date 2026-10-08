import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {ApiBearerAuth,ApiOperation,ApiResponse,ApiTags} from '@nestjs/swagger';
import { ispublic } from 'src/common/decorators/public.decorator';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create an order' })
  @ApiResponse({ status: 201, description: 'Order created' })
  create(@Body() createOrderDto: CreateOrderDto) {
    
    const order = this.orderService.create(createOrderDto)

    return {

      message : 'order created successfully',
      success : true ,
      data : order
    }
  }

 @Post('webhook')
  @ispublic()
  @ApiOperation({ summary: 'Kashier payment webhook' })
  webhook(@Body() body: unknown) {
    console.log('Kashier webhook received');

    return {success: true, received: true}}

}
