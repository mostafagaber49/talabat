import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from 'src/models/category/category.repository';
import { CreateCategory } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(private readonly categoryRepsitory : CategoryRepository){}
  async create(createCategory: CreateCategory) {
    
    const categoryexist = await this.categoryRepsitory.getOne({name: createCategory.name})

    if(categoryexist) {throw new ConflictException('category already exist')}

    return await this.categoryRepsitory.create(createCategory)

  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
