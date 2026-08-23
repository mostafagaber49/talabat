
import { registerDecorator,ValidationArguments,  ValidationOptions } from "class-validator";
import { Discountenum } from "src/common/enum/discount.enum";

export function IsValidDiscount (validationoptions ? : ValidationOptions){

return function(object :any , prppertyname : string){


registerDecorator({
name: 'IsValidDiscount',
target: object.constructor,
propertyName: prppertyname,
options: validationoptions,
validator: {

    validate(value: any, args: ValidationArguments) {

    const obj = args.object as any
    const {discountType, price} = obj

    if (discountType == Discountenum.percentage){

        return typeof value === 'number' && value >= 0 && value <= 100
    }

    if (discountType == Discountenum.FixedAmount){

        return typeof value === 'number' && value >= 0 && value <= price
    }

        return true
    },


    defaultMessage(args: ValidationArguments){

        const obj = args.object as any
        const {discountType, price, discount} = obj

        if (discountType == Discountenum.percentage){

            if(discount > 100) 
            return 'discount amount canot exceed 100 when type is percentage'

        return 'discpunt amount must be a valid positive number'
        
        }

        if(discountType == Discountenum.FixedAmount) {

            if(discount > price)
                return 'discount amount canot exceed price'

            return 'discount amount must be a valid positive number'
        }

        return 'invalid discount amount'
    }

    // validate(value: any , args: Validaion)

}

})


}

}