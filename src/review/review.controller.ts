import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ResponseFormat } from 'src/errors/response.format';
import { CreateReviewDto } from './dto/create.review.dto';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // // 조건에 맞는 리뷰 모두 보기 GET
  // @Get('/reviews/me')
  // async getReviews(
  //   @Query('placeId') placeId: string,
  //   @Query('pageNumber') pageNumber: number,
  //   @Query('pageSize') pageSize: number,
  //   @Req() req: Request,
  // ) {
  //   const userId = req.user && !req.user.isAdmin ? req.user.userId : undefined;
  //   const { reviews, totalCount } = await this.reviewService.getReviews(
  //     pageNumber,
  //     pageSize,
  //     placeId,
  //     userId,
  //   );
  //   return ResponseFormat.buildResponse({ reviews, totalCount });
  // }
  // // 새로운 장소 등록 POST
  // @Post('/reviews')
  // async postReview(@Body() createReviewDto: CreateReviewDto) {
  //   const newReview = await this.reviewService.createReview(
  //     createReviewDto,
  //     // userId: req.user.userId,
  //   );
  //   return ResponseFormat.buildResponse(newReview);
  // }

  // // 리뷰 수정 PATCH
  // @Patch('/reviews/:reviewId')
  // async patchReview(
  //   @Param('reviewId') reviewId: string,
  //   @Body('content') content: string,
  // ) {
  //   const updatedReview = await this.reviewService.updateReview(
  //     reviewId,
  //     content,
  //   );
  //   return ResponseFormat.buildResponse(updatedReview);
  // }

  // // 리뷰 삭제 DELETE
  // @Delete('/reviews/:reviewId')
  // async deleteReiview(@Param('reviewId') reviewId: string) {
  //   const deletedReview = await this.reviewService.deleteReview(reviewId);
  //   return ResponseFormat.buildResponse(deletedReview);
  // }
}
