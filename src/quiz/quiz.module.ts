import { SharedModule } from '../shared/shared.module';
import { forwardRef, Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quiz } from './quiz.model';
import { Question } from '../questions/questions.model';
import { QuestionsModule } from '../questions/questions.module';
import { User } from '../user/user.model';
import { AuthModule } from '../auth/auth.module';
import { Moderation } from 'src/moderation/moderation.model';
import { ModerationModule } from 'src/moderation/moderation.module';

@Module({
  controllers: [QuizController],
  providers: [QuizService],
  imports: [
    ModerationModule,
    forwardRef(() => QuestionsModule),
    SequelizeModule.forFeature([Quiz, Question, User, Moderation]),
    SharedModule,
    AuthModule,
  ],
  exports: [QuizService],
})
export class QuizModule {}
