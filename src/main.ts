import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = +configService.get('PORT');
  console.log('Using port', PORT);

  await app.listen(PORT);
}
start();
