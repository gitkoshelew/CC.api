import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Quiz } from './quiz.model';
import { AddQuestionDto } from "./dto/addQuestion.dto";

@ApiTags('Quiz')
@Controller('/api/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @ApiOperation({summary: 'Method to get all quiz'})
  @ApiResponse({status: 200, type: Quiz})
  @Get('/')
  getAll() {
    return this.quizService.getAll();
  }

  @ApiOperation({summary: 'Method to get one quiz'})
  @ApiResponse({status: 200, type: [Quiz]})
  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.quizService.getById(id);
  }

  @ApiOperation({summary: 'Method to create quiz'})
  @ApiResponse({status: 201, type: Quiz})
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Post('/add')
  addQuestionToQuiz(@Body() addQuestionDto: AddQuestionDto) {
    return this.quizService.addQuestionToQuiz(addQuestionDto);
  }
}
