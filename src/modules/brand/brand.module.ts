import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandFactoryService } from './brand.factory.service';
import { brandmongomodule } from 'src/shared/modules/brand.mongo.module';
import { CategoryService } from '../category/category.service';
import { categorymongomodule } from 'src/shared/modules/category.mongo.module';

@Module({
  imports: [brandmongomodule, categorymongomodule],
  controllers: [BrandController],
  providers: [BrandService, BrandFactoryService, CategoryService],
  exports: [BrandFactoryService, BrandService, CategoryService]
})
export class BrandModule {}
