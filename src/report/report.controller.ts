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
import { ResponseFormat } from 'src/errors/response.format';
import { CreateReportedPlaceDto } from './dto/create.reported.place.dto';

@Controller()
export class ReportedPlaceController {
  constructor(private readonly reportedPlaceService: ReportedPlaceService) {}

  // // id로 특정 제보 장소 GET
  // @Get('/reports/:reportedPlaceId')
  // async getReportedPlace(@Param('reportedPlaceId') reportedPlaceId: string) {
  //   const reportedPlace =
  //     await this.reportedPlaceService.getReportedPlace(reportedPlaceId);
  //   return ResponseFormat.buildResponse(reportedPlace);
  // }

  // // 제보 장소 전체 GET
  // @Get('/admin/reports')
  // async getReportedPlaces(
  //   @Query('pageNumber') pageNumber: number,
  //   @Query('pageSize') pageSize: number,
  // ) {
  //   const reportedPlaces = await this.reportedPlaceService.getReportedPlaces(
  //     pageNumber,
  //     pageSize,
  //   );
  //   return ResponseFormat.buildResponse(reportedPlaces);
  // }

  // // 유저의 제보 장소 모두 가져오기 GET
  // @Get('/reports/me')
  // async getReportedPlacesByUser(
  //   @Query('pageNumber') pageNumber: number,
  //   @Query('pageSize') pageSize: number,
  //   @Req() req: Request,
  // ) {
  //   // const userId = req.user.userId;
  //   const reportedPlaces = await this.reportedPlaceService.getReportedPlaces(
  //     pageNumber,
  //     pageSize,
  //     // userId,
  //   );
  //   return ResponseFormat.buildResponse(reportedPlaces);
  // }

  // // 새로운 장소 제보 POST
  // @Post('/reports')
  // async postReportedPlace(
  //   @Body() createReportedPlaceDto: CreateReportedPlaceDto,
  //   @Req() req: Request,
  // ) {
  //   const userId = req.user.userId;
  //   const newReportedPlace =
  //     await this.reportedPlaceService.createReportedPlace(
  //       createReportedPlaceDto,
  //       userId,
  //     );
  //   return ResponseFormat.buildResponse(newReportedPlace);
  // }

  // // 제보 장소 수정 PUT
  // @Put('/reports/:reportedPlaceId')
  // async putReportedPlace(
  //   @Param('reportedPlaceId') reportedPlaceId: string,
  //   @Body() updateReportedPlaceDto: CreateReportedPlaceDto,
  //   @Req() req: Request,
  // ) {
  //   // const userId = req.user.userId;
  //   const updatedReportedPlace =
  //     await this.reportedPlaceService.updateReportedPlace(
  //       reportedPlaceId,
  //       updateReportedPlaceDto,
  //       // userId,
  //     );
  //   return ResponseFormat.buildResponse(updatedReportedPlace);
  // }

  // // 제보 장소 삭제 DELETE
  // @Delete('/reports/:reportedPlaceId')
  // async deleteReportedPlace(@Param('reportedPlaceId') reportedPlaceId: string) {
  //   const deletedReportedPlace =
  //     await this.reportedPlaceService.deleteReportedPlace(reportedPlaceId);
  //   return ResponseFormat.buildResponse(deletedReportedPlace);
  // }
}
