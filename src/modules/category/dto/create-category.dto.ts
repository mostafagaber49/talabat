import { IsNotEmpty, IsOptional,IsString,MaxLength,MinLength} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Pizza' })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: 'https://example.com/category.jpg',
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiPropertyOptional({ example: 'categories' })
  @IsOptional()
  @IsString()
  folderId?: string;
}