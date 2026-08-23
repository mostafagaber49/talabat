import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderMongoModule } from 'src/shared/modules/order.mongo.module';
import { productmongomodule } from 'src/shared/modules/product.mongo.module';

@Module({
  imports: [OrderMongoModule, productmongomodule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrederModule {}
