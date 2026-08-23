import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


export type iAdress = Adress & Document
@Schema({timestamps: true})
export class Adress {

_id: Types.ObjectId

@Prop({type: String})
userName: string

@Prop({type: String})
phoneNumber: string

@Prop({type: String})
street : string

@Prop({type: String})
city : string 

@Prop({type: String})
country: string

@Prop({type: String})
details: string 

}

export const adressschema = SchemaFactory.createForClass(Adress)