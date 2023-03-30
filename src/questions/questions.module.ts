import { forwardRef, Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './questions.model';
import { Moderation } from '../moderation/moderation.model';
import { Quiz } from '../quiz/quiz.model';
import { TopicModule } from '../topic/topic.module';
import { ModerationModule } from '../moderation/moderation.module';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { QuizModule } from 'src/quiz/quiz.module';

@Module({
  providers: [QuestionsService],
  controllers: [QuestionsController],
  imports: [
    forwardRef(() => QuizModule),
    SequelizeModule.forFeature([Question, Quiz]),
    TopicModule,
    SharedModule,
    AuthModule,
  ],
  exports: [QuestionsService],
})
export class QuestionsModule {}
