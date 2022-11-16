import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const PORT = app.get(ConfigService).get('PORT');
  console.log('Using port', +PORT);

  const config = new DocumentBuilder()
    .setTitle('Fusion server API')
    .setDescription('Api for NestJs pet project to meet with the technology')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
start();
