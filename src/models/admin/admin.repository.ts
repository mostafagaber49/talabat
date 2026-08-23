import { IAdmin } from "src/common/interfaces/user.interface";
import { abstractRepository } from "../abstract.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { Admin } from "./admin.schema";


@Injectable()
export class AdminRepository extends abstractRepository<IAdmin>{

constructor(@InjectModel(Admin.name) adminModel: Model<IAdmin>){
    super(adminModel)
}


}