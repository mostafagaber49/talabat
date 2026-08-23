import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { OrderStatus } from "src/common/enum/order.status.enum";
import { PaymentMethod } from "src/common/enum/payment.method.enum";


export type iOrder = Order & Document
@Schema({timestamps: true})
export class orderItem{


    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
    productId : Types.ObjectId

    @Prop({type: String})
    productName: string 

    @Prop({type: Number})
    productPrice: number

    @Prop({type: Number})
    productDiscount: number

    @Prop({type: Number})
    productFinalPrice: number

    @Prop({type: Number})
    subtotal: number

    @Prop({type: Number})
    quantity: number

}


export class Order {

_id: Types.ObjectId

@Prop({type: String , required: true})
orderId: string

@Prop({type: mongoose.Schema.Types.ObjectId , ref: 'Adress'})
adressId: Types.ObjectId

@Prop({type: String , enum: PaymentMethod})
paymentMethod: PaymentMethod 

@Prop({type: String })
inviceLink: string

@Prop({type: [orderItem] })
orderItems: orderItem[]

@Prop({type: Number})
subTotal: number 

@Prop({type: Number})
fees: number

@Prop({type: Number})
total: number

@Prop({type: String, enum : OrderStatus})
status:  OrderStatus

}

export const orderschema = SchemaFactory.createForClass(orderItem)