import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ImageModule } from './image/image.module';
import { PlaceModule } from './place/place.module';
import { ReportedPlaceModule } from './report/report.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    UserModule,
    BookmarkModule,
    ImageModule,
    PlaceModule,
    ReportedPlaceModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
