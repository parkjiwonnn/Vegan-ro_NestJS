import { BadRequestException, Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  // 새로운 리뷰 등록
  async createReview({ placeId, content, userId }) {
    const newReview = await this.reviewRepository.createReview({
      placeId,
      content,
      userId,
    });
    if (newReview === null) {
      throw new BadRequestException('리뷰 등록에 실패하였습니다.');
    }
    return { message: '정상적으로 등록되었습니다.', newReview };
  }
  // 조건에 맞는 리뷰 모두 가져오기
  async getReviews(
    pageNumber: number,
    pageSize: number,
    placeId: string,
    userId: string,
  ) {
    const { reviews, totalCount } = await this.reviewRepository.findReviews(
      pageNumber,
      pageSize,
      placeId,
      userId,
    );
    return { reviews, totalCount };
  }
  // 특정 id를 가진 리뷰 내용 수정
  async updateReview(id: string, content: string) {
    const updatedReview = await this.reviewRepository.updateReview(id, content);
    if (updatedReview === null) {
      throw new BadRequestException('해당 id를 갖는 리뷰가 없습니다.');
    }
    return { message: '정상적으로 수정되었습니다.', updatedReview };
  }
  // 특정 id를 가진 리뷰 삭제
  async deleteReview(id: string) {
    const deletedReview = await this.reviewRepository.deleteReview(id);
    if (deletedReview === null) {
      throw new BadRequestException('해당 id를 갖는 리뷰가 없습니다.');
    }
    return { message: '정상적으로 삭제되었습니다.', deletedReview };
  }
}
