import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Req,
  Put,
  Delete,
} from '@nestjs/common';
import { ReportedPlaceService } from './report.service';
import { ResponseFormat } from 'src/global/response.format';
import { CreateReportedPlaceDto } from './dto/create.reported.place.dto';

@Controller()
export class ReportedPlaceController {
  constructor(private readonly reportedPlaceService: ReportedPlaceService) {}

  // id로 특정 제보 장소 GET
  @Get('/reports/:reportedPlaceId')
  async getReportedPlace(
    @Param('reportedPlaceId') reportedPlaceId: string,
  ): Promise<ResponseFormat> {
    const reportedPlace =
      await this.reportedPlaceService.getReportedPlace(reportedPlaceId);
    return new ResponseFormat(reportedPlace);
  }

  // 제보 장소 전체 GET
  @Get('/admin/reports')
  async getReportedPlaces(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ): Promise<ResponseFormat> {
    const reportedPlaces = await this.reportedPlaceService.getReportedPlaces(
      pageNumber,
      pageSize,
    );
    return new ResponseFormat(reportedPlaces);
  }

  // 유저의 제보 장소 모두 가져오기 GET
  @Get('/reports/me')
  async getReportedPlacesByUser(
    @Req() req,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ): Promise<ResponseFormat> {
    const user_id = req.user.userId;
    const reportedPlaces = await this.reportedPlaceService.getReportedPlaces(
      pageNumber,
      pageSize,
      user_id,
    );
    return new ResponseFormat(reportedPlaces);
  }

  // 새로운 장소 제보 POST
  @Post('/reports')
  async createReportedPlace(
    @Req() req,
    @Body() createReportedPlaceDto: CreateReportedPlaceDto,
  ): Promise<ResponseFormat> {
    const user_id = req.user.userId;
    const newReportedPlace =
      await this.reportedPlaceService.createReportedPlace(
        createReportedPlaceDto,
        user_id,
      );
    return new ResponseFormat(newReportedPlace);
  }

  // 제보 장소 수정 PUT
  @Put('/reports/:reportedPlaceId')
  async updateReportedPlace(
    @Req() req,
    @Param('reportedPlaceId') reportedPlaceId: string,
    @Body() updateReportedPlaceDto: CreateReportedPlaceDto,
  ): Promise<ResponseFormat> {
    const user_id = req.user.userId;
    const updatedReportedPlace =
      await this.reportedPlaceService.updateReportedPlace(reportedPlaceId, {
        updateReportedPlaceDto,
        user_id,
      });
    return new ResponseFormat(updatedReportedPlace);
  }

  // 제보 장소 삭제 DELETE
  @Delete('/reports/:reportedPlaceId')
  async deleteReportedPlace(
    @Param('reportedPlaceId') reportedPlaceId: string,
  ): Promise<ResponseFormat> {
    const deletedReportedPlace =
      await this.reportedPlaceService.deleteReportedPlace(reportedPlaceId);
    return new ResponseFormat(deletedReportedPlace);
  }
}
