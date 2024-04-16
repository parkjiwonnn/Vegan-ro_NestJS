import { Module } from "@nestjs/common";
import { ImageController } from "./image.controller";
import { ImageRepository } from "./image.repository";
import { ImageService } from "./image.service";
import { MongooseModule } from "@nestjs/mongoose";
import { imageSchema } from "./image.schema";


@Module({
    imports: [ MongooseModule.forFeature([
        { name: 'Image', schema: imageSchema },
      ]),
    ],
    controllers: [ImageController],
    providers: [ImageService, ImageRepository],
    exports: [ImageRepository], 
    
})
export class ImageModule {}