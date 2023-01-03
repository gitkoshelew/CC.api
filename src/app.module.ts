import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from './permission/permission.model';
import { PermissionModule } from './permission/permission.module';
import { PermissionGroupModule } from './permission-group/permission-group.module';
import { PermissionGroup } from './permission-group/permission-group.model';
import { TopicModule } from './topic/topic.module';
import { Topic } from './topic/topic.model';
import { ModerationModule } from './moderation/moderation.module';
import { Moderation } from './moderation/moderation.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Permission, PermissionGroup, Topic, Moderation],
      autoLoadModels: true
  }),
  QuizModule,
   PermissionModule,
   PermissionGroupModule,
    TopicModule,
    ModerationModule,],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
