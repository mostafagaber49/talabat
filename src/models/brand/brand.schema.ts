import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { Category } from "../category/category.schema";



export type iBrand = Brand & Document
@Schema({timestamps: true})
export class Brand {


@Prop({type: String , required : true, trim : true})
name: string

@Prop({type: String, required : true, trim : true })
slug : string

@Prop({type: String})
logo : string 

@Prop({type: String})
folderId: string 

@Prop({type: mongoose.Schema.ObjectId, ref : 'Category'})
categoryIds : Types.ObjectId

}

export const brandschema = SchemaFactory.createForClass(Brand)