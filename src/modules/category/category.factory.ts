
import slugify from "slugify"
import { CreateCategory } from "./entities/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Injectable } from "@nestjs/common";


@Injectable()
export class CategoryFactoryService {

CreateCategory(createcategorydto: CreateCategoryDto){


const newCategory = new CreateCategory()


newCategory.name = createcategorydto.name.toLowerCase().trim()
newCategory.slug = slugify(newCategory.name)
newCategory.logo = createcategorydto.logo
newCategory.folderId = createcategorydto.folderId

return newCategory

}

}