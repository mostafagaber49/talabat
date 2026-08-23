import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { gender } from 'src/common/enum/gender.enum';
import { provider } from 'src/common/enum/provider.enum';
import { role } from 'src/common/enum/role.enum';

@Schema({ timestamps: true  , discriminatorKey: 'role'})
export class User {



  @Prop({ required: true , type: String, minLength: 2 , maxLength: 20})
  userName!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({type : String})
  phoneNumber!: string;

  @Prop({type: String , enum: role, default: role.User})
  role!: string;

  @Prop({type: String, enum: gender, default: gender.Male})
  gender!: string;

  @Prop({type: String , enum : provider , default: provider.System})
  provider!: string;

  @Prop({type : String, required: true})
  password!: string


 @Prop({ default: false })
 isVerified: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);