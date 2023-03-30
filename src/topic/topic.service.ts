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
      // <Remark>
      // why use create variable for getting the promise?
      // just return the result directly
      return await this.topicRepository.create(dto);
    } catch (error) {
      throw CustomErrorHandler.BadRequest(error.errors[0].message);
    }
  }

  async getAllTopics() {
    try {
      return await this.topicRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw CustomErrorHandler.InternalServerError('Server problems');
    }
  }

  async getTopicById(id: number) {
    try {
      // <Remark>
      // Return the result directly
      // Name of function already tells you what to expect
      return await this.topicRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw CustomErrorHandler.BadRequest("Topic with this id doen't exist");
    }
  }

  // <Remark>
  // do not forget about splitting the logical blocks by using new lines
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
