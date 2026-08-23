import { InjectModel } from "@nestjs/mongoose";
import { abstractRepository } from "../abstract.repository";
import { Adress, iAdress } from "./adress.schema";
import { Model } from "mongoose";

export class AdressRepository extends abstractRepository<iAdress>{
constructor(@InjectModel(Adress.name) adressModel : Model<iAdress>){

    super(adressModel)
}

}