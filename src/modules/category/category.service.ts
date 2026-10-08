import { ConflictException, Injectable } from '@nestjs/common';
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

}
