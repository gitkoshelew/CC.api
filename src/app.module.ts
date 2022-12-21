import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from "./quiz/quiz.module";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`
  }),  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'database',
    models: [],
    autoLoadModels: true,
  }),
  QuizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
