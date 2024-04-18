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
  UseGuards,
} from '@nestjs/common';
import { ReportedPlaceService } from './report.service';
import { ResponseFormat } from 'src/errors/response.format';
import { CreateReportedPlaceDto } from './dto/create.reported.place.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller()
export class ReportedPlaceController {
  constructor(private readonly reportedPlaceService: ReportedPlaceService) {}

  // id로 특정 제보 장소 GET
  @Get('/reports/:reportedPlaceId')
  async getReportedPlace(@Param('reportedPlaceId') reportedPlaceId: string) {
    const reportedPlace =
      await this.reportedPlaceService.getReportedPlace(reportedPlaceId);
    return ResponseFormat.buildResponse(reportedPlace);
  }

  // 제보 장소 전체 GET
  @Get('/admin/reports')
  @UseGuards(JwtAuthGuard)
  async getReportedPlaces(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ) {
    const reportedPlaces = await this.reportedPlaceService.getReportedPlaces(
      pageNumber,
      pageSize,
    );
    return ResponseFormat.buildResponse(reportedPlaces);
  }

  // 유저의 제보 장소 모두 가져오기 GET
  @Get('/reports/me')
  @UseGuards(JwtAuthGuard)
  async getReportedPlacesByUser(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Req() req,
  ) {
    const user_id = req.user.userId;
    const reportedPlaces = await this.reportedPlaceService.getReportedPlaces(
      pageNumber,
      pageSize,
      user_id,
    );
    return ResponseFormat.buildResponse(reportedPlaces);
  }

  // 새로운 장소 제보 POST
  @Post('/reports')
  @UseGuards(JwtAuthGuard)
  async postReportedPlace(
    @Body() createReportedPlaceDto: CreateReportedPlaceDto,
    @Req() req,
  ) {
    const user_id = req.user.userId;
    const newReportedPlace =
      await this.reportedPlaceService.createReportedPlace(
        createReportedPlaceDto,
        user_id,
      );
    return ResponseFormat.buildResponse(newReportedPlace);
  }

  // 제보 장소 수정 PUT
  @Put('/reports/:reportedPlaceId')
  @UseGuards(JwtAuthGuard)
  async putReportedPlace(
    @Param('reportedPlaceId') reportedPlaceId: string,
    @Body() updateReportedPlaceDto: CreateReportedPlaceDto,
    @Req() req,
  ) {
    const user_id = req.user.userId;
    const updatedReportedPlace =
      await this.reportedPlaceService.updateReportedPlace(reportedPlaceId, {
        updateReportedPlaceDto,
        user_id,
      });
    return ResponseFormat.buildResponse(updatedReportedPlace);
  }

  // 제보 장소 삭제 DELETE
  @Delete('/reports/:reportedPlaceId')
  @UseGuards(JwtAuthGuard)
  async deleteReportedPlace(@Param('reportedPlaceId') reportedPlaceId: string) {
    const deletedReportedPlace =
      await this.reportedPlaceService.deleteReportedPlace(reportedPlaceId);
    return ResponseFormat.buildResponse(deletedReportedPlace);
  }
}
