import { SetMetadata } from "@nestjs/common"


export const IS_PUBLIC = '-IS_PUBLUC'
export const ispublic = ()=>{

    return SetMetadata('is_public', true)
}