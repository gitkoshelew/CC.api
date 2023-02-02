import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { axios } from 'axios';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  await app.listen(process.env.CHAT_SERVICE_PORT);
}
bootstrap();
