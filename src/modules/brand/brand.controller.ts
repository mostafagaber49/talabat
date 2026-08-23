import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandFactoryService } from './brand.factory.service';

@Controller('brand')
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly brandfacoryservice : BrandFactoryService
  ) {}

  @Post()
 async create(@Body() createBrandDto: CreateBrandDto) {
    
     const brand = await this.brandfacoryservice.CreateBrand(createBrandDto)

     const brandcreated  = await this.brandService.create(brand)

     return{

      message: 'brand created successfully',
      success : true ,
      data : brandcreated
     }
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
