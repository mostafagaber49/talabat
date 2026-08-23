import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFactoryService } from './category.factory';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService,
    private readonly factoryservice : CategoryFactoryService
  ) {}

  @Post('/create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    

    const category = this.factoryservice.CreateCategory(createCategoryDto)

    const categorycreated = await this.categoryService.create(category)

    return {
        message: 'category created successfully',
        success: true,
        data :{categorycreated}

          }

  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
