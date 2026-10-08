import { Controller, Post, Body} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import {ApiBearerAuth,ApiOperation,ApiResponse,ApiTags} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({status: 201, description: 'Product created successfully'})
  async create(@Body() createProductDto: CreateProductDto) {
    const productcreated = await this.productService.create(createProductDto)

    return {
      message: 'product created successfully',
      success: true,
      data: {productcreated}

    }
  }

}
