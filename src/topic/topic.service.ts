import { Injectable } from '@nestjs/common';
import { Topic } from './topic.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTopicDto } from './dto/create-topic.dto';

@Injectable()
export class TopicService {
  constructor(@InjectModel(Topic) private topicRepository: typeof Topic) {}
  async createTopic(dto: CreateTopicDto) {
    const topic = await this.topicRepository.create(dto);
    return topic;
  }

  async getAllTopics() {
    const topics = await this.topicRepository.findAll();
    return topics;
  }
}
