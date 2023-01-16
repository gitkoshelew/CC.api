import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { TopicService } from './topic.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Topic } from './topic.model';

@ApiTags('Topic')
@Controller('api/topic')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @ApiOperation({ summary: 'Creating topic' })
  @ApiResponse({ status: 201, type: Topic })
  @Post()
  createTopic(@Body() dto: CreateTopicDto) {
    return this.topicService.createTopic(dto);
  }

  @ApiOperation({ summary: 'Get all topics' })
  @ApiResponse({ status: 200, type: [Topic] })
  @Get()
  getAllTopics() {
    return this.topicService.getAllTopics();
  }

  @ApiOperation({ summary: 'Method to get one topic by id' })
  @ApiResponse({ status: 200, type: [Topic] })
  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.topicService.getTopicById(id);
  }

  @ApiOperation({ summary: 'Method to delete topic by id' })
  @ApiResponse({ status: 200, type: Topic })
  @Delete('/:id')
  deleteById(@Param('id') id: number) {
    return this.topicService.deleteTopicById(id);
  }
}
