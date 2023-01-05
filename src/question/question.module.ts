import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Question } from "./question.model";
import { Quiz } from "../quiz/quiz.model";
import { Quiz_Question } from "../quiz/quiz_question.model";
import { Topic } from "../topic/topic.model";
import { Moderation } from "../moderation/moderation.model";
import { ModerationModule } from "../moderation/moderation.module";

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports: [
    SequelizeModule.forFeature([Question, Quiz, Quiz_Question, Topic, Moderation]),
    ModerationModule
  ],
  exports: [QuestionService]
})
export class QuestionModule {}
