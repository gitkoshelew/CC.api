import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CorrectAnswerController } from './correct-answer.controller';
import { CorrectAnswers } from './correct-answer.model';
import { CorrectAnswerService } from './correct-answer.service';

@Module({
  controllers: [CorrectAnswerController],
  providers: [CorrectAnswerService],
  imports: [SequelizeModule.forFeature([CorrectAnswers])],
  exports: [CorrectAnswerService],
})
export class CorrectAnswerModule {}
