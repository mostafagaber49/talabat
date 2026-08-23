import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { gender } from "src/common/enum/gender.enum";

@Schema({timestamps: true})
export class Customer {

@Prop({required : true , type: String , minLength:2, maxLength: 20})
userName!: string

@Prop({type: String})
phoneNumber!: string 

@Prop({type: String})
adress!: string 

@Prop({type: String , required: true})
password!: string 

@Prop({type: String, required: true})
email!: string 

@Prop({type: String, enum: gender, default: gender.Male})
gender! : string 

}

export const customerschema = SchemaFactory.createForClass(Customer)