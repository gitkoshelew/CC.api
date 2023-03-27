import { Injectable } from '@nestjs/common';
import { Topic } from './topic.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTopicDto } from './dto/create-topic.dto';
import { CustomErrorHandler } from 'src/utils/custom-error-handler';

@Injectable()
export class TopicService {
  constructor(@InjectModel(Topic) private topicRepository: typeof Topic) {}

  async createTopic(dto: CreateTopicDto) {
    try {
      const create = this.topicRepository.create(dto);
      const topic = await create;
      return topic;
    } catch (error) {
      throw CustomErrorHandler.BadRequest(error.errors[0].message);
    }
  }

  async getAllTopics() {
    try {
      const topicList = await this.topicRepository.findAll({
        include: { all: true },
      });
      return topicList;
    } catch (error) {
      throw CustomErrorHandler.InternalServerError('Server problems');
    }
  }

  async getTopicById(id: number) {
    try {
      const topic = await this.topicRepository.findOne({
        where: { id },
        include: { all: true },
      });
      return topic;
    } catch (error) {
      throw CustomErrorHandler.BadRequest("Topic with this id doen't exist");
    }
  }

  async deleteTopicById(id: number) {
    try {
      const topic = await this.topicRepository.findOne({
        where: { id },
      });
      await topic.destroy();
      return this.topicRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw CustomErrorHandler.BadRequest("Topic with this id doen't exist");
    }
  }
}
