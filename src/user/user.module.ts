import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";

@Module({
    imports: [] ,
    controllers: [UserController, UserRepository],
    providers: [UserService],
    
})
export class UserModule {}