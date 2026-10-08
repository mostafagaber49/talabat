import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryFactoryService } from './category.factory';
import {ApiBearerAuth,ApiOperation,ApiResponse,ApiTags} from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService,
    private readonly factoryservice : CategoryFactoryService
  ) {}

  @Post('/create')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 201, description: 'Category created' })  
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    

    const category = this.factoryservice.CreateCategory(createCategoryDto)

    const categorycreated = await this.categoryService.create(category)

    return {
        message: 'category created successfully',
        success: true,
        data :{categorycreated}

          }

  }
}
