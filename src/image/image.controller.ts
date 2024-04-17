import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from "@nestjs/common";
import { ImageService } from "./image.service";
import { CreateImageDto } from "./dto/create.image.dto";
import { UpdateImageDto } from "./dto/update.image.dto";
import { ResponseFormat } from "src/errors/response.format";

@Controller('admin')
export class ImageController {constructor(
    private readonly imageService: ImageService,
) {}

// 이미지 추가
@Post()
async postImage(@Body() CreateImageDto:CreateImageDto) {
  const newImage = await this.imageService.createImage(CreateImageDto);
  return ResponseFormat.buildResponse(newImage);
}

// 이미지 수정
@Put('images/:imageId')
async putImage(@Param('imageId') imageId: string, @Body() updateImageDto: UpdateImageDto) {
  const updatedImage = await this.imageService.updateImage(imageId, updateImageDto);
  return ResponseFormat.buildResponse(updatedImage);
}


// 이미지 삭제
@Delete('images/:imageId')
async deleteImage(@Param('imageId') imageId: string) {
  const deletedImage = await this.imageService.deleteImage(imageId);
  return ResponseFormat.buildResponse(deletedImage);
}

// 이미지 전체 조회(이름 쿼리)
@Get('images')
async getImages(@Query('name') name?: string) {
  let images;
  if (name) {
    images = await this.imageService.getImageByName(name);
  } else {
    images = await this.imageService.getImages();
  }
  return ResponseFormat.buildResponse(images);
}

// 이미지 id로 조회
@Get('images/:imageId')
async getImageById(@Param('imageId') imageId: string) {
  const imageInfo = await this.imageService.getImageById(imageId);
  return ResponseFormat.buildResponse(imageInfo);
}
}