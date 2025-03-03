import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:5173', // wherever the frontend is running
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // allow these HTTP methods
    credentials: true, // allow cookies and credentials
  });

  //should be found on http://localhost:3000/api
  const config = new DocumentBuilder()
  .setTitle('Playlist Guitar Lessons')
  .setDescription('Backend API for Playlist Guitar Lessons')
  .setVersion('1.0')
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);

SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();