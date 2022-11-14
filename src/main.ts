import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const PORT = app.get(ConfigService).get('PORT');
  console.log('Using port', +PORT);

  await app.listen(PORT);
}
start();
