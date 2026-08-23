import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  create(@Body() createOrderDto: CreateOrderDto) {
    
    const order = this.orderService.create(createOrderDto)

    return {

      message : 'order created successfully',
      success : true ,
      data : order
    }
  }



  @Post()
  webhook(@Body() body: any){


  console.log(body);
  
  }


  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrederDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrederDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
