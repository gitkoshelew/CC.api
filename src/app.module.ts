import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from './permission/permission.model';
import { PermissionModule } from './permission/permission.module';
import { AccessGroupModule } from './access-group/access-group.module';
import { TopicModule } from './topic/topic.module';
import { Topic } from './topic/topic.model';
import { ModerationModule } from './moderation/moderation.module';
import { Moderation } from './moderation/moderation.model';
import { Question } from './questions/questions.model';
import { QuestionsModule } from './questions/questions.module';
import { AccessPermission } from './access-group/access-permission.model';
import { AccessGroup } from './access-group/access-group.model';
import { User } from './user/user.model';
import { Quiz } from './quiz/quiz.model';
import { Quiz_Question } from './quiz/quiz.question.model';
import { UserAccess } from './user/user.access.model';
import { UserModule } from './user/user.module';
import { EnumsController } from './enums/enums.controller';
import { EnumsService } from './enums/enums.service';
import { EnumsModule } from './enums/enums.module';

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
    QuizModule,
    UserModule,
    PermissionModule,
    AccessGroupModule,
    TopicModule,
    ModerationModule,
    QuestionsModule,
    EnumsModule,
  ],

  controllers: [AppController, EnumsController],
  providers: [AppService, EnumsService],
})
export class AppModule {}
