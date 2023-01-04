import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Quiz } from "./quiz.model";
import { Question } from "../question/question.model";
import { Quiz_Question } from "./quiz_question.model";
import { QuestionModule } from "../question/question.module";

@Module({
  controllers: [QuizController],
  providers: [QuizService],
  imports: [
    SequelizeModule.forFeature([Quiz, Question, Quiz_Question]),
    QuestionModule
  ],
})
export class QuizModule {}
