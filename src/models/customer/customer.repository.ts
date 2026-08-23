import { ICustomer } from "src/common/interfaces/user.interface";
import { abstractRepository } from "../abstract.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "./customer.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerRepository extends abstractRepository<ICustomer>{

constructor(@InjectModel(Customer.name) customerModel : Model<ICustomer>){

super(customerModel)
}


}