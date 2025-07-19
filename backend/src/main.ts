import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
<<<<<<< Updated upstream
  
  // CORS კონფიგურაცია - ყველა origin-ის უშვება დეველოპმენტისთვის
  app.enableCors({
    origin: true, // ყველა origin-ის უშვება
=======

  // CORS კონფიგურაცია
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // ფრონტენდის URL
>>>>>>> Stashed changes
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // სტატიკური ფაილების მხარდაჭერა
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  // ვალიდაციის pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(4000);
  console.log('Application is running on: http://localhost:4000');
}
bootstrap();
