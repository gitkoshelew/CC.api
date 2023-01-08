import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './questions.model';
import { Topic } from '../topic/topic.model';
import { Moderation } from '../moderation/moderation.model';

@Module({
  providers: [QuestionsService],
  controllers: [QuestionsController],
  imports: [SequelizeModule.forFeature([Question, Topic, Moderation])],
})
export class QuestionsModule {}
