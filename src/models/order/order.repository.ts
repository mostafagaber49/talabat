import { InjectModel } from "@nestjs/mongoose";
import { abstractRepository } from "../abstract.repository";
import { iOrder, Order } from "./oreder.schema";
import { Model } from "mongoose";


export class OrderRepository extends abstractRepository<iOrder> {

constructor(@InjectModel(Order.name) orderModer : Model<iOrder> ){

    super(orderModer)
}


}