import { Types } from "mongoose"

export class Brand {

logo : string | undefined
folderId: string | undefined
name: string 
slug : string 
categoryIds: Types.ObjectId[]


}
