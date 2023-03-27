import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Topic } from './topic.model';
import { Question } from '../questions/questions.model';

@Module({
  providers: [TopicService],
  controllers: [TopicController],
  imports: [SequelizeModule.forFeature([Topic, Question])],
  exports: [TopicService],
})
export class TopicModule {}
