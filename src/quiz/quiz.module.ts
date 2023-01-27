import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quiz } from './quiz.model';
import { Question } from '../questions/questions.model';
import { QuestionsModule } from '../questions/questions.module';
import { Quiz_Question } from './quiz.question.model';
import { User } from '../user/user.model';

@Module({
  controllers: [QuizController],
  providers: [QuizService],
  imports: [
    SequelizeModule.forFeature([Quiz, Question, Quiz_Question, User]),
    QuestionsModule,
    SharedModule,
  ],
})
export class QuizModule {}
