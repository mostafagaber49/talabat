import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from 'src/models/order/order.repository';
import { ProductRepository } from 'src/models/product/product.repository';
import { Types } from 'mongoose';
import { PaymentMethod } from 'src/common/enum/payment.method.enum';
import { OrderStatus } from 'src/common/enum/order.status.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository : OrderRepository ,
    private readonly productRepository: ProductRepository,
    private readonly configService : ConfigService
  ){}

  async create(createOrderDto: CreateOrderDto) {

   const productexist =  await this.productRepository.getOne({_id: createOrderDto.product})
    if(!productexist) {throw new NotFoundException('product not found')}

    if(createOrderDto.quantity > productexist.stock){
      throw new BadRequestException('quantity is grater then product stock')
    }
    
    const prepareObj = {

      orederId : Math.floor(Math.random() * 100000 + 900000),
      adressId: new Types.ObjectId(createOrderDto.adress),

      orderItems: [
        {
              productId : productexist._id,
          
              productName: productexist.name, 
          
              productPrice: productexist.price,
          
              productDiscount: productexist.discount,
          
              productFinalPrice: productexist.finalPrice,
          
              subtotal: createOrderDto.quantity * productexist.finalPrice,
          
              quantity: createOrderDto.quantity
        }
      ],

      PaymentMethod: createOrderDto.paymentMethod,
      status:  

      createOrderDto.paymentMethod == PaymentMethod.COD 
      ? OrderStatus.placed
      : OrderStatus.pending,

      subtotal : productexist.finalPrice * createOrderDto.quantity,
      fees : createOrderDto.paymentMethod == PaymentMethod.COD
      ? (this.configService.get('COD_FEES') as number)
      : 0

    }

    const createdOrder = await this.orderRepository.create(prepareObj)
    if(createOrderDto.paymentMethod == PaymentMethod.COD) {return createdOrder}

    const body = {
  merchantId: 'MID-47688-581',
  paymentType: 'credit',
  amount: prepareObj.subtotal,
  currency: 'egp',
  order: createdOrder._id,
  type: 'one-time',
  allowedMethods: 'card,wallet',
  enable3DS: true,
  serverWebhook: 'http://localhost:3000/order/webhook', // todo
  merchantRedirect: 'https://youtube.com',
  failureRedirect: false,
  description: 'pay for e-commerce app - c45-g3',
  interactionSource: 'ECOMMERCE',
  expireAt: new Date(Date.now() + 2000).toISOString(),
  customer: { reference: 'ka3bora@gmail.com' },
} 


    const res = await fetch('https://test-api.kashier.io/v3/payment/sessions',{

      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.configService.get('kashier').apiKey,
        Authorization: this.configService.get('kashier').secretKey

      },

      body: JSON.stringify(body)

    })

    return {createdOrder, kashierRes: await res.json()}

  }

  findAll() {
    return `This action returns all oreder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oreder`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} oreder`;
  }

  remove(id: number) {
    return `This action removes a #${id} oreder`;
  }



}
