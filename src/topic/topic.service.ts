import { Injectable } from '@nestjs/common';
import { Topic } from './topic.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTopicDto } from './dto/create-topic.dto';
import { ErrorHandler } from 'src/utils/error-handler';

@Injectable()
export class TopicService {
  constructor(@InjectModel(Topic) private topicRepository: typeof Topic) {}

  async createTopic(dto: CreateTopicDto) {
    try {
      return this.topicRepository.create(dto);
    } catch (error) {
      throw ErrorHandler.BadRequest(error);
    }
  }

  async getAllTopics() {
    try {
      return this.topicRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.InternalServerError('Server problems');
    }
  }

  async getTopicById(id: number) {
    try {
      return this.topicRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.BadRequest("Topic with this id doen't exist");
    }
  }

  async deleteTopicById(id: number) {
    try {
      const topic = await this.getTopicById(id);
      await topic.destroy();
      return this.topicRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.BadRequest("Topic with this id doen't exist");
    }
  }
}
