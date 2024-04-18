import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema } from "./user.schema";
import { ImageModule } from "src/image/image.module";
import { ConfigModule } from "@nestjs/config";
import { reviewSchema } from "src/review/review.schema";

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'User', schema: userSchema },
        { name: 'Review', schema: reviewSchema }]),
        ImageModule,
        ConfigModule
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserRepository], 
    
})
export class UserModule {}