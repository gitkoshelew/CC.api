import { Body, Controller, Post } from '@nestjs/common';
import { CreateQuestionOptionDto } from './dto/create-questionOption.dto';
import { QuestionOptionsService } from './question-options.service';

@Controller('api/question-options')
export class QuestionOptionsController {
  constructor(private questionOptionsService: QuestionOptionsService) {}

  @Post()
  create(@Body() dto: CreateQuestionOptionDto) {
    return this.questionOptionsService.createQuestionOption(dto);
  }
}
