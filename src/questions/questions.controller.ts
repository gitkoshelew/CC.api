import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Question } from "./questions.model";

@ApiTags('Question')
@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @ApiOperation({summary: 'Method to get all questions'})
  @ApiResponse({status: 200, type: Question})
  @Get()
  getAll() {
    return this.questionService.getAllQuestions();
  }

  @ApiOperation({summary: 'Method to get one question'})
  @ApiResponse({status: 200, type: [Question]})
  @Get('/:id')
  getQuestionById(@Param('id') id: number) {
    return this.questionService.getQuestionById(id);
  }

  @ApiOperation({summary: 'Method to create question'})
  @ApiResponse({status: 201, type: Question})
  @Post()
  create(@Body() dto: CreateQuestionDto) {
    return this.questionService.createQuestion(dto);
  }

  @ApiOperation({summary: 'Method to delete question'})
  @ApiResponse({status: 200, type: Question})
  @Delete('/:id')
  deleteById(@Param('id') id: number) {
    return this.questionService.deleteQuestionById(id);
  }
}
