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
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`GRS Backend is running on: http://localhost:${port}`);
  console.log(`API Base URL: http://localhost:${port}/api`);
}
bootstrap();
