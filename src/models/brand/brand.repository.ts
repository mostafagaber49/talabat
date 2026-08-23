import { InjectModel } from "@nestjs/mongoose";
import { abstractRepository } from "../abstract.repository";
import { Brand, iBrand } from "./brand.schema";
import { Model } from "mongoose";

export class BrandRepository extends abstractRepository<iBrand>{

constructor(@InjectModel(Brand.name) brandmodel : Model<iBrand>  ){
super(brandmodel)


}


}