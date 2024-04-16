import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { reviewSchema } from './review.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Review', schema: reviewSchema },
  ]),
],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
