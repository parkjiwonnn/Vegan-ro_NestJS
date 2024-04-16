import { Injectable } from '@nestjs/common';
import { ImageRepository } from './image.repository';
import { AppError } from '../errors/app.error';
import { commonErrors } from '../errors/common.errors';
import { UpdateImageDto } from './dto/update.image.dto';

@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

// 이미지 추가
  async createImage({ name, url }) {
    const newImage = await this.imageRepository.createImage({ name, url });
    if (!newImage) {
      throw new AppError(
        commonErrors.objectCreationError,
        '이미지 등록에 실패하였습니다.',
        400,
      );
    }
    return { message: '정상적으로 등록되었습니다.', newImage };
  }

// 이미지 수정
async updateImage(imageId: string, updateImageDto: UpdateImageDto): Promise<any> {
    const updatedImage = await this.imageRepository.updateImage(imageId, updateImageDto);
    if (!updatedImage) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 이미지가 없습니다.',
        400,
      );
    }
    return { message: '정상적으로 수정되었습니다.', updatedImage };
  }
  
// 이미지 삭제
  async deleteImage(id) {
    const deletedImage = await this.imageRepository.deleteImage(id);
    if (!deletedImage) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 이미지가 존재하지 않습니다',
        404,
      );
    }
    return { message: '이미지가 성공적으로 삭제되었습니다.', deletedImage };
  }

  // 이미지 전체 조회
  async getImages() {
    const images = await this.imageRepository.getImages();
    if (!images.length) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '이미지가 존재하지 않습니다',
        400,
      );
    }
    return images;
  }
//이미지 id로 조회
  async getImageById(id) {
    const imageInfo = await this.imageRepository.getImageById(id);
    if (!imageInfo) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '이미지를 찾을 수 없습니다.',
        404,
      );
    }
    return imageInfo;
  }
// 이름으로 이미지 조회
  async getImageByName(name) {
    const imageInfo = await this.imageRepository.getImageByName(name);
    if (!imageInfo) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 이미지가 존재하지 않습니다',
        404,
      );
    }
    return imageInfo;
  }
}
