import { Module } from '@nestjs/common';
import { ReportedPlaceService } from './report.service';
import { ReportedPlaceController } from './report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { reportedPlaceSchema } from './report.schema';
import { ReportedPlaceRepository } from './report.repository';
import { ImageModule } from 'src/image/image.module';
import { ImageRepository } from 'src/image/image.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Report', schema: reportedPlaceSchema },
    ]),
  ],
  controllers: [ReportedPlaceController],
  providers: [ReportedPlaceService, ReportedPlaceRepository, ImageRepository],
})
export class ReportedPlaceModule {}
