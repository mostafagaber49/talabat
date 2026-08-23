import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryFactoryService } from './category.factory';
import { categorymongomodule } from 'src/shared/modules/category.mongo.module';

@Module({
  imports: [categorymongomodule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryFactoryService],
  exports:[CategoryService, CategoryFactoryService]
})
export class CategoryModule {}
