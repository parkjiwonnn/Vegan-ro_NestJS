import { Module } from "@nestjs/common";
import { ImageController } from "./image.controller";
import { ImageRepository } from "./image.repository";
import { ImageService } from "./image.service";
import { MongooseModule } from "@nestjs/mongoose";
import { imageSchema } from "./image.schema";
import { ResponseFormatService } from "src/errors/response.format";


@Module({
    imports: [ MongooseModule.forFeature([
        { name: 'Image', schema: imageSchema },
      ]),
    ],
    controllers: [ImageController],
    providers: [ImageService, ImageRepository,ResponseFormatService],
    exports: [ImageRepository], 
    
})
export class ImageModule {}