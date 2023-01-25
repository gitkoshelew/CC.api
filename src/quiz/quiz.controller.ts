import {
  Body,
  Controller,
  Delete,
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
import { AddQuestionDto } from './dto/addQuestion.dto';
import { Put } from '@nestjs/common/decorators';
import { Quiz_Question } from './quiz.question.model';
import { NotificationsService } from 'src/shared/services/notifications.service';
import { NotificationTarget } from 'src/shared/types/notificationTarget.enum';

@ApiTags('Quiz')
@Controller('/api/quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly notificationService: NotificationsService,
  ) {}

  @ApiOperation({ summary: 'Method to view all quizzes' })
  @ApiResponse({ status: 200, type: Quiz })
  @Get('/')
  getAll() {
    return this.quizService.getAll();
  }

  @ApiOperation({ summary: 'Method to get one quiz' })
  @ApiResponse({ status: 200, type: [Quiz] })
  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.quizService.getById(id);
  }

  @ApiOperation({ summary: 'Method to create new quiz' })
  @ApiResponse({ status: 201, type: Quiz })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createQuizDto: CreateQuizDto) {
    console.log('being called');
    const res = await this.quizService.createQuiz(createQuizDto);
    this.notificationService.created(NotificationTarget.QUIZ, 'test');
    return res;
  }

  @ApiOperation({ summary: 'Method add question to quiz' })
  @ApiResponse({ status: 201, type: Quiz_Question })
  @Put('/add')
  addQuestionToQuiz(@Body() dto: AddQuestionDto) {
    return this.quizService.addQuestionToQuiz(dto);
  }

  @ApiOperation({ summary: 'Method to delete question by id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteQuizById(@Param('id') id: number) {
    return this.quizService.deleteQuizById(id);
  }
}
