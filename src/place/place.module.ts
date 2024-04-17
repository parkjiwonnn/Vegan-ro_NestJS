import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { placeSchema } from './place.schema';
import { PlaceRepository } from './place.repository';
import { ImageRepository } from 'src/image/image.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Place', schema: placeSchema }]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService, PlaceRepository, ImageRepository],
})
export class PlaceModule {}
