import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './global/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
}
bootstrap();
