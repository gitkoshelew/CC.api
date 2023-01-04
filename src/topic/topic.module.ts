import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Topic } from "./topic.model";

@Module({
  controllers: [TopicController],
  providers: [TopicService],
  imports: [
    SequelizeModule.forFeature([Topic])
  ],
  exports: [TopicService]
})
export class TopicModule {}
