import { IsOptional, IsString , IsNotEmpty, Min, Max, MinLength, MaxLength} from "class-validator"

export class CreateCategoryDto {

@IsNotEmpty()
@MinLength(2)
@MaxLength(20)
@IsString()
name: string


@IsOptional()
@IsString()
logo: string

@IsString()
@IsOptional()
folderId: string


slug : string


}
