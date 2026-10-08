import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ example: 'McDonalds' })
  @IsNotEmpty()
  @Min(2)
  @Max(20)
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: 'https://example.com/logo.png',
  })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiPropertyOptional({ example: 'brands' })
  @IsOptional()
  @IsString()
  folderId?: string;

  @ApiProperty({
    type: [String],
    example: ['66c123456789abcdef123456'],
  })
  @IsArray()
  @IsMongoId({ each: true })
  categoryIds!: string[];
}