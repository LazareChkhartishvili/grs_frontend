import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger კონფიგურაცია
  const config = new DocumentBuilder()
    .setTitle('GRS API')
    .setDescription('Georgian Rehabilitation System API დოკუმენტაცია')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

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
  console.log(`Swagger Documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
