import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ImageModule } from './image/image.module';
import { PlaceModule } from './place/place.module';
import { ReportedPlaceModule } from './report/report.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretHere', // 실제 사용시 안전한 곳에 보관한 시크릿 키를 사용해야 합니다.
      signOptions: { expiresIn: '24h' },}),
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        console.log('📍 Connected to MongoDB');
        return {
          uri,
        };
      },
    }),
    UserModule,
    BookmarkModule,
    ImageModule,
    PlaceModule,
    ReportedPlaceModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule],
})
export class AppModule {}
