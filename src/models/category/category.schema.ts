import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type Icategory = Category & Document

@Schema({timestamps: true})
export class Category {

@Prop({type: String , required : true, trim : true})
name: string

@Prop({type: String, required : true, trim : true })
slug : string

@Prop({type: String})
logo : string 

@Prop({type: String})
folderId: string 



}


export const categoryschema = SchemaFactory.createForClass(Category)