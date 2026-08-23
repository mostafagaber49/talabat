import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator"

export class CreateBrandDto {

@IsNotEmpty()
@Min(2)
@Max(20)
@IsString()
name: string

slug : string


@IsString()
@IsOptional()
logo : string


@IsOptional()
@IsString()
folderId: string 


@IsArray()
@IsMongoId({each: true})
categoryIds : string[]

}
