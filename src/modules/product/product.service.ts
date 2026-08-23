import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/models/product/product.repository';
import { CategoryRepository } from 'src/models/category/category.repository';
import { BrandRepository } from 'src/models/brand/brand.repository';
import slugify from "slugify"
import { Types } from 'mongoose';

@Injectable()
export class ProductService {

  constructor(
    private readonly productRepository : ProductRepository,
    private readonly categoryRepository : CategoryRepository,
    private readonly brandRepository : BrandRepository


  ){}
  async create(createProductDto: CreateProductDto) {

   const productexist =  await this.productRepository.getOne(
    {name: createProductDto.name.toLowerCase().trim()})

    if(productexist) {

      return await this.productRepository.updateOne(

        {_id : productexist._id},
        {stock: {$inc: createProductDto.stock}}

      )
    }

    const categoryexist = await this.categoryRepository.getOne({_id : createProductDto.categoryId})
    if(!categoryexist) {throw new NotFoundException("category not found")}

    const brandexist = await this.brandRepository.getOne({_id : createProductDto.brandId})
    if(!brandexist) {throw new NotFoundException("brand not found")}

    let preparedObj = {

      name: createProductDto.name.toLocaleLowerCase().trim(),
      slug: slugify(createProductDto.name),
      subImages: createProductDto.subImages,
      stock: createProductDto.stock,
      sizes: createProductDto.sizes,
      colors: createProductDto.colors,
      brandId: new Types.ObjectId(createProductDto.brandId),
      discription: createProductDto.discription,
      price: createProductDto.price,
      discount: createProductDto.discount,
      discountType: createProductDto.discountType,
      mainImage: createProductDto.mainImage,
      categoryId: new Types.ObjectId(createProductDto.categoryId)

    }

    return await this.productRepository.create(preparedObj)

  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
