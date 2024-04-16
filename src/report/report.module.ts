import { Module } from '@nestjs/common';
import { ReportedPlaceService } from './report.service';
import { ReportedPlaceController } from './report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { reportedPlaceSchema } from './report.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Report', schema: reportedPlaceSchema },
  ]),
],
  controllers: [ReportedPlaceController],
  providers: [ReportedPlaceService],
})
export class ReportedPlaceModule {}
