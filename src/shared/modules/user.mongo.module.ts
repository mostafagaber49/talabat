import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminRepository } from "src/models/admin/admin.repository";
import { Admin, adminSchema } from "src/models/admin/admin.schema";
import { CustomerRepository } from "src/models/customer/customer.repository";
import { Customer, customerschema } from "src/models/customer/customer.schema";
import { UserRepository } from "src/models/user/user.repository";
import { User, UserSchema } from "src/models/user/user.schema";

@Module({

imports: [

    MongooseModule.forFeature([{

        name: User.name,
        schema : UserSchema,
        discriminators: [

           { name : Admin.name, schema : adminSchema},
           {name : Customer.name, schema: customerschema}
        ]
    }])

],
controllers : [],
providers : [UserRepository, CustomerRepository, AdminRepository],
exports: [UserRepository, CustomerRepository, AdminRepository],


})

export class Usermongomodule {}