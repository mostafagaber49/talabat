import { IUser } from "src/common/interfaces/user.interface";
import { abstractRepository } from "../abstract.repository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { User } from "./user.schema";

@Injectable()
export class UserRepository extends abstractRepository<IUser>{

constructor(@InjectModel(User.name) userModel : Model<IUser>){
    super(userModel)
}

}