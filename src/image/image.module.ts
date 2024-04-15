import { Module } from "@nestjs/common";
import { ImageController } from "./image-controller";
import { ImageRepository } from "./image-repository";
import { ImageService } from "./image-service";


@Module({
    imports: [] ,
    controllers: [ImageController, ImageRepository],
    providers: [ImageService],
    
})
export class ImageModule {}