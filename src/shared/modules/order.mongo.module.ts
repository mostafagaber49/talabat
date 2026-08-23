import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderRepository } from "src/models/order/order.repository";
import { Order, orderschema } from "src/models/order/oreder.schema";

@Module({

    imports: [
        MongooseModule.forFeature([

            {
                name: Order.name,
                schema: orderschema
            }
        ])
    ],
    providers: [OrderRepository],
    exports : [OrderRepository]



})

export class OrderMongoModule{}