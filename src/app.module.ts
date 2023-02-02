import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as process from 'process';
import { AccessGroup } from './access-group/access-group.model';
import { AccessGroupModule } from './access-group/access-group.module';
import { AccessPermission } from './access-group/access-permission.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './inventory/inventory.module';
import { Moderation } from './moderation/moderation.model';
import { ModerationModule } from './moderation/moderation.module';
import { Permission } from './permission/permission.model';
import { PermissionModule } from './permission/permission.module';
import { Question } from './questions/questions.model';
import { QuestionsModule } from './questions/questions.module';
import { Quiz } from './quiz/quiz.model';
import { QuizModule } from './quiz/quiz.module';
import { Quiz_Question } from './quiz/quiz.question.model';
import { Topic } from './topic/topic.model';
import { TopicModule } from './topic/topic.module';
import { UserAccess } from './user/user.access.model';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV ?? ''}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Quiz,
        Permission,
        AccessGroup,
        AccessPermission,
        Topic,
        Moderation,
        Question,
        Quiz_Question,
        UserAccess,
      ],
      autoLoadModels: true,
    }),
    AuthModule,
    QuizModule,
    UserModule,
    PermissionModule,
    AccessGroupModule,
    TopicModule,
    ModerationModule,
    QuestionsModule,
    InventoryModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
