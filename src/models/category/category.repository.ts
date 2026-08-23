import { InjectModel } from "@nestjs/mongoose";
import { abstractRepository } from "../abstract.repository";
import { Category, Icategory } from "./category.schema";
import { Model } from "mongoose";

export class CategoryRepository extends abstractRepository<Icategory> {

    constructor(@InjectModel(Category.name) categorymodel : Model<Icategory>){
    super(categorymodel)

    }

}