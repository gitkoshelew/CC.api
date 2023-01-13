import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './questions.model';
import { Topic } from '../topic/topic.model';
import { Moderation } from '../moderation/moderation.model';
import { Quiz } from "../quiz/quiz.model";
import { Quiz_Question } from "../quiz/quiz.question.model";

@Module({
  providers: [QuestionsService],
  controllers: [QuestionsController],
  imports: [SequelizeModule.forFeature([Question, Topic, Moderation, Quiz, Quiz_Question])],
  exports: [QuestionsService]
})
export class QuestionsModule {}
