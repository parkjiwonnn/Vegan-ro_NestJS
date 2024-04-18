import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create.place.dto';
import { ResponseFormat } from 'src/errors/response.format';

@Controller()
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  // 새로운 장소 등록 POST
  @Post('/admin/places')
  async postPlace(
    @Body() createPlaceDto: CreatePlaceDto,
  ): Promise<ResponseFormat> {
    const newPlace = await this.placeService.createPlace(createPlaceDto);
    return ResponseFormat.buildResponse(newPlace);
  }

  // 특정 장소 GET
  @Get('/places/:placeId')
  async getPlace(@Param('placeId') placeId: string): Promise<ResponseFormat> {
    const place = await this.placeService.getPlace(placeId);
    return ResponseFormat.buildResponse(place);
  }

  // 장소 필터링 GET
  @Get('/places')
  async getPlaces(
    @Query('center') center?: string,
    @Query('radius') radius?: number,
    @Query('pageNumber') pageNumber?: number,
    @Query('pageSize') pageSize?: number,
    @Query('category') category?: string,
    @Query('veganOption') veganOption?: boolean,
    @Query('search') search?: string,
  ): Promise<ResponseFormat> {
    let query: any = {};
    if (search) {
      query.search = search;
    }
    let places: any;
    if (Object.keys(query).length === 0) {
      places = await this.placeService.getPlaces(
        center,
        radius,
        pageNumber,
        pageSize,
        category,
        veganOption,
      );
    } else {
      places = await this.placeService.getPlacesByKeyword(
        query.search,
        pageNumber,
        pageSize,
      );
    }
    return ResponseFormat.buildResponse(places);
  }

  // 장소 전체 조회 GET
  // @Get('/admin/places')

  // 장소 수정 PUT
  @Put('/admin/places/:placeId')
  async putPlace(
    @Param('placeId') placeId: string,
    @Body() updatePlaceDto: CreatePlaceDto,
  ): Promise<ResponseFormat> {
    const updatedPlace = await this.placeService.updatePlace(
      placeId,
      updatePlaceDto,
    );
    return ResponseFormat.buildResponse(updatedPlace);
  }

  // 장소 삭제 DELETE
  @Delete('/admin/places/:placeId')
  async deletePlace(
    @Param('placeId') placeId: string,
  ): Promise<ResponseFormat> {
    const deletedplace = await this.placeService.deletePlace(placeId);
    return ResponseFormat.buildResponse(deletedplace);
  }

  // 장소 삭제 여부 PATCH
  @Patch('/admin/places/:placeId')
  async patchDeletedAt(
    @Param('placeId') placeId: string,
  ): Promise<ResponseFormat> {
    const updatedPlace = await this.placeService.updateDeletedAt(placeId);
    return ResponseFormat.buildResponse(updatedPlace);
  }
}
