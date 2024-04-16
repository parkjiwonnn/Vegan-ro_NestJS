import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema } from "./user.schema";

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'User', schema: userSchema },
      ]),
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserRepository], 
    
})
export class UserModule {}