import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryRepository } from "src/models/category/category.repository";
import { Category, categoryschema } from "src/models/category/category.schema";



@Module({

imports: [MongooseModule.forFeature([

{
name: Category.name,
schema: categoryschema

}

])],
providers : [CategoryRepository],
exports: [CategoryRepository]



})
export class categorymongomodule {}