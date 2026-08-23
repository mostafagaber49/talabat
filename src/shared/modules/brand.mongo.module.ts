import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BrandRepository } from "src/models/brand/brand.repository";
import { Brand, brandschema } from "src/models/brand/brand.schema";

@Module({

imports: [MongooseModule.forFeature([
{
    name : Brand.name,
    schema : brandschema
}


])],
providers: [BrandRepository],
exports: [BrandRepository]


})
export class brandmongomodule {}