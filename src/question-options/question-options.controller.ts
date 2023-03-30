import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateQuestionOptionDto } from './dto/create-questionOption.dto';
import { QuestionOptions } from './question-options.model';
import { QuestionOptionsService } from './question-options.service';

@ApiTags('Question-options')
@Controller('api/question-options')
export class QuestionOptionsController {
  constructor(private questionOptionsService: QuestionOptionsService) {}

  @ApiOperation({ summary: 'Method to add correct answer to question' })
  @ApiResponse({ status: 200, type: QuestionOptions })
  @Post()
  async create(@Body() dto: CreateQuestionOptionDto) {
    return this.questionOptionsService.createQuestionOption(dto);
  }
}
