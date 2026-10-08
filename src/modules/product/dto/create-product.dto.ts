import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Discountenum } from 'src/common/enum/discount.enum';
import { IsValidDiscount } from '../../category/dto/validation.dto';

export class CreateProductDto {
  @ApiProperty({
    example: '66c123456789abcdef123456',
  })
  @IsMongoId()
  brandId!: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['red', 'black'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @ApiPropertyOptional({
    type: [String],
    example: ['small', 'medium'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sizes?: string[];

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsPositive()
  stock!: number;

  @ApiProperty({
    type: [String],
    example: ['image1.jpg', 'image2.jpg'],
  })
  @IsArray()
  @IsString({ each: true })
  subImages!: string[];

  @ApiProperty({ example: 'Chicken Burger' })
  @IsNotEmpty()
  @Min(2)
  @Max(100)
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'Chicken burger with cheese and special sauce',
  })
  @IsNotEmpty()
  @Min(5)
  @Max(1000)
  @IsString()
  description!: string;

  @ApiProperty({ example: 150 })
  @IsNumber()
  @IsPositive()
  @Min(1)
  price!: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsValidDiscount()
  discount!: number;

  @ApiProperty({
    enum: Discountenum,
    example: Discountenum.percentage,
  })
  @IsEnum(Discountenum)
  discountType!: Discountenum;

  @ApiProperty({ example: 'main-image.jpg' })
  @IsString()
  @IsNotEmpty()
  mainImage!: string;

  @ApiProperty({
    example: '66c123456789abcdef123456',
  })
  @IsMongoId()
  categoryId!: string;
}