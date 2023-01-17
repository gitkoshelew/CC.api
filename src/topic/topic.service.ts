import { Injectable } from '@nestjs/common';
import { Topic } from './topic.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTopicDto } from './dto/create-topic.dto';

@Injectable()
export class TopicService {
  constructor(@InjectModel(Topic) private topicRepository: typeof Topic) {}

  async createTopic(dto: CreateTopicDto) {
    return await this.topicRepository.create(dto);
  }

  async getAllTopics() {
    return await this.topicRepository.findAll();
  }

  async getTopicById(id: number) {
    return await this.topicRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async deleteTopicById(id: number) {
    return await this.topicRepository.destroy({ where: { id } });
  }
}
