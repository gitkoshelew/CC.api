import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Topic } from './topic.model';

@Module({
  providers: [TopicService],
  controllers: [TopicController],
  imports: [SequelizeModule.forFeature([Topic])],
})
export class TopicModule {}
