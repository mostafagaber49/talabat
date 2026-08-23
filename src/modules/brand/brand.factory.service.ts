import { Injectable } from "@nestjs/common";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { Brand } from "./entities/brand.entity";
import  slugify from "slugify"
import { Types } from "mongoose";


@Injectable()
export class BrandFactoryService {

    CreateBrand(createBrandDto: CreateBrandDto){

const newBrand = new Brand()

newBrand.name = createBrandDto.name.toLowerCase().trim()
newBrand.slug = slugify(newBrand.name)
newBrand.logo = createBrandDto.logo
newBrand.folderId = createBrandDto.folderId
newBrand.categoryIds = createBrandDto.categoryIds.map((id) => new Types.ObjectId)

return newBrand


    }

}