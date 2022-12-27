import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Post()
  create(@Body() topicDto: CreateTopicDto) {
    return this.topicService.createTopic(topicDto);
  }

  @Get()
  getAll() {
    return this.topicService.getAllTopics();
  }
}
