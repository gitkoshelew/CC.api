import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './utils/custom-exception-filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Docs for CC.api')
    .setDescription(
      'This is description for all methods that available in our app. You can find ALL endpoints and examples of data to ANY available method and responce',
    )
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT, () =>
    console.log(`[nest main] -> server started on http://localhost:${PORT}`),
  );
}
bootstrap();
