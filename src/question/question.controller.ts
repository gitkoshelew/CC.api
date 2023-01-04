import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Quiz } from "../quiz/quiz.model";
import { Question } from "./question.model";
import { CreateQuizDto } from "../quiz/dto/create-quiz.dto";
import { CreateQuestionDto } from "./dto/create-question.dto";

@ApiTags('Question')
@Controller('api/question')
export class QuestionController {
  constructor(private question: QuestionService) {}

  @ApiOperation({summary: 'Method to get all questions'})
  @ApiResponse({status: 200, type: Question})
  @Get()
  getQuests() {
    return this.question.getAll()
  }

  @ApiOperation({summary: 'Method to get one question'})
  @ApiResponse({status: 200, type: [Question]})
  @Get('/:id')
  getQuestionById(@Param('id') id: number) {
    return this.question.getQuestionById(id)
  }

  @ApiOperation({summary: 'Method to create question'})
  @ApiResponse({status: 201, type: Question})
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateQuestionDto) {
    return this.question.createQuestion(dto);
  }
}
