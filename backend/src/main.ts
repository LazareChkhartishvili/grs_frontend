import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global API prefix
  app.setGlobalPrefix('api');

  // CORS კონფიგურაცია frontend-ისთვის
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // ახალი პორტი conflicts-ის ასაცილებლად
  await app.listen(4000);
  console.log('GRS Backend is running on: http://localhost:4000');
  console.log('API Base URL: http://localhost:4000/api');
}
bootstrap();
