import { ArrayMinSize, IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString , Max, Min} from "class-validator"
import {  Discountenum } from "src/common/enum/discount.enum"
import { Transform } from 'class-transformer';
import { Types } from "mongoose";
import { IsValidDiscount } from "../../category/dto/validation.dto";

export class CreateProductDto {

@IsMongoId()
@Transform(({value})=> new Types.ObjectId) 
brandId : string 

@IsString()
@ArrayMinSize(0)
@IsOptional()
@IsArray()
colors : string []

@ArrayMinSize(0)
@IsOptional()
@IsString()
@IsArray()
sizes : string []

@IsNumber()
@Transform(({value}) => value ?? 1)
stock : number 

@IsString({each: true})
@IsArray()
subImages: string[]


@IsNotEmpty()
@Min(2)
@Max(20)
@IsString()
name: string 



@IsNotEmpty()
@Min(20)
@Max(1000)
@IsString()
discription: string 


@IsNumber()
@IsPositive()
@Min(1)
price : number 


@IsValidDiscount()
discount : number 

@IsEnum(Discountenum)
@IsString()
discountType: Discountenum


@IsString()
@IsNotEmpty()
mainImage: string

@IsMongoId()
@Transform(({value})=> new Types.ObjectId) 
categoryId: string


}

