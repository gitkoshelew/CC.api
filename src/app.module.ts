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
    username: 'root',
    password: 'root',
    database: 'cc_db',
    models: [],
    autoLoadModels: true,
  }),
  QuizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
