import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productmongomodule } from 'src/shared/modules/product.mongo.module';
import { categorymongomodule } from 'src/shared/modules/category.mongo.module';
import { brandmongomodule } from 'src/shared/modules/brand.mongo.module';

@Module({
  imports: [productmongomodule, categorymongomodule, brandmongomodule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
