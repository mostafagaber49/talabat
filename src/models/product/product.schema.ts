import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { Discountenum } from "src/common/enum/discount.enum";




export type iproduct = Product & Document
@Schema({timestamps: true})
export class Product {


@Prop({type: [String]})
size! : string[]

@Prop({type: Number})
stock : number

@Prop({type: Number, min: 1})
price!: number 

@Prop({})
name!: string

@Prop({type: Number})
discount! : number 

@Prop({type: [String]})
sizes : string[]

@Prop({type: [String]})
colors : string[]

@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
categoryId : Types.ObjectId

@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Brand'})
brandId: Types.ObjectId

@Prop({type: mongoose.Types.ObjectId, ref: 'User'})
updateBy: Types.ObjectId

@Prop({type: mongoose.Types.ObjectId, ref: 'User'})
createdBy: Types.ObjectId

@Prop({type: String, required: true, trim : true})
description : string

@Prop({type: String, required: true})
mainImage: string

@Prop({type : [String]})
subImage : string[]

@Prop({type: String})
slug : string

@Prop({type: String})
logo: string

@Prop({type: String, enum: Discountenum})
discountType: Discountenum

@Prop({type: Number,default : function(this: any): number{

if(this.discountType === 'fixedAmount') return this.price - this.discount

else if(this.discountType === 'percentage') 
return this.price - (this.discount * this.price) / 100

return this.price

 } })
finalPrice : number
}

export const productschema = SchemaFactory.createForClass(Product)