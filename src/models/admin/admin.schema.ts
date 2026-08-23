import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps : true, discriminatorKey: 'role'})
export class Admin {


@Prop({type : String, minLength: 2, maxLength: 20, required: true})
userName!: string

@Prop({ required: true })
email!: string

@Prop({type : String})
phoneNumber!: string

@Prop({type : String, required: true})
password!: string

@Prop({type: Boolean})
isActive!: boolean


}

export const adminSchema = SchemaFactory.createForClass(Admin);