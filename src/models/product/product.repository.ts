import { Model } from "mongoose";
import { abstractRepository } from "../abstract.repository";
import { iproduct, Product } from "./product.schema";
import { InjectModel } from "@nestjs/mongoose";

export class ProductRepository extends abstractRepository<iproduct>{

constructor(@InjectModel(Product.name) productmodel : Model<iproduct>){
super(productmodel)


}
}