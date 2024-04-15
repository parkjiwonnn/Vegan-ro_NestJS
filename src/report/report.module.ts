import { Module } from '@nestjs/common';
import { ReportedPlaceService } from './report.service';
import { ReportedPlaceController } from './report.controller';

@Module({
  imports: [],
  controllers: [ReportedPlaceController],
  providers: [ReportedPlaceService],
})
export class ReportedPlaceModule {}
