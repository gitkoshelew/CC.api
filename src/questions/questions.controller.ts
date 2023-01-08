import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}
  @Get()
  getAll() {
    return this.questionService.getAllQuestions();
  }
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.questionService.getQuestionById(id);
  }

  @Post()
  create(@Body() dto: CreateQuestionDto) {
    return this.questionService.createQuestion(dto);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.questionService.deleteQuestionById(id);
  }
}
