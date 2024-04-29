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
import { ResponseFormat } from 'src/global/response.format';
import { CreateReviewDto } from './dto/create.review.dto';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // getReviews 공통 함수
  async getReviews(
    pageNumber?: number,
    pageSize?: number,
    userId?: string,
    placeId?: string,
  ) {
    const { reviews, totalCount } = await this.reviewService.getReviews(
      pageNumber,
      pageSize,
      userId,
      placeId,
    );
    return new ResponseFormat({ reviews, totalCount });
  }

  // 유저별 리뷰 조회 GET
  @Get('/reviews/me')
  async getReviewsByUser(
    @Req() req,
    @Query('pageNumber') pageNumber?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<ResponseFormat> {
    const userId = req.user && !req.user.isAdmin ? req.user.userId : undefined;
    return await this.getReviews(pageNumber, pageSize, userId);
  }

  // 장소별 리뷰 조회 GET
  @Get('/reviews')
  async getReviewsByPlace(
    @Req() req,
    @Query('placeId') placeId: string,
    @Query('pageNumber') pageNumber?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<ResponseFormat> {
    const userId = req.user && !req.user.isAdmin ? req.user.userId : undefined;
    return await this.getReviews(pageNumber, pageSize, userId, placeId);
  }

  // 리뷰 본인 확인 GET
  @Get('/reviews/check')
  async getReviewsCheck(
    @Req() req,
    @Query('placeId') placeId: string,
    @Query('pageNumber') pageNumber?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<ResponseFormat> {
    const userId = req.user && !req.user.isAdmin ? req.user.userId : undefined;
    return await this.getReviews(pageNumber, pageSize, userId, placeId);
  }

  // 관리자 리뷰 조회 GET
  @Get('/admin/reviews')
  async getReviewsUseAdmin(
    @Req() req,
    @Query('pageNumber') pageNumber?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<ResponseFormat> {
    const userId = req.user && !req.user.isAdmin ? req.user.userId : undefined;
    return await this.getReviews(pageNumber, pageSize, userId);
  }

  // 새로운 장소 등록 POST
  @Post('/reviews')
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @Req() req,
  ): Promise<ResponseFormat> {
    const user_id = req.user.userId;
    const newReview = await this.reviewService.createReview(
      createReviewDto,
      user_id,
    );
    return new ResponseFormat(newReview);
  }

  // 리뷰 수정 PATCH
  @Patch('/reviews/:reviewId')
  async updateReview(
    @Param('reviewId') reviewId: string,
    @Body('content') content: string,
  ): Promise<ResponseFormat> {
    const updatedReview = await this.reviewService.updateReview(
      reviewId,
      content,
    );
    return new ResponseFormat(updatedReview);
  }

  // 리뷰 삭제 DELETE
  @Delete('/reviews/:reviewId')
  async deleteReiview(
    @Param('reviewId') reviewId: string,
  ): Promise<ResponseFormat> {
    const deletedReview = await this.reviewService.deleteReview(reviewId);
    return new ResponseFormat(deletedReview);
  }

  // 관리자 리뷰 삭제 DELETE
  @Delete('/admin/reviews/:reviewId')
  async deleteReiviewUseAdmin(
    @Param('reviewId') reviewId: string,
  ): Promise<ResponseFormat> {
    const deletedReview = await this.reviewService.deleteReview(reviewId);
    return new ResponseFormat(deletedReview);
  }
}
