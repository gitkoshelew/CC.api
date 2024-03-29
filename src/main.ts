import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './utils/custom-exception-filter';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

dotenv.config();

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:8081',
      'http://localhost:4200',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Docs for CC.api')
    .setDescription(
      'This is description for all methods that available in our app. You can find ALL endpoints and examples of data to ANY available method and response',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());

  await app.listen(PORT, () =>
    console.log(`[nest main] -> server started on http://localhost:${PORT}`),
  );
}
bootstrap();
