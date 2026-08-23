import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductRepository } from "src/models/product/product.repository";
import { Product, productschema } from "src/models/product/product.schema";

@Module({

imports:[MongooseModule.forFeature([
{
    name: Product.name,
    schema: productschema
}


])],
providers:[ProductRepository],
exports:[ProductRepository]


})
export class productmongomodule {}