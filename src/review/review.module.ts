import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { reviewSchema } from './review.schema';
import { ReviewRepository } from './review.repository';
import { PlaceModule } from 'src/place/place.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Review', schema: reviewSchema }]),
    PlaceModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
