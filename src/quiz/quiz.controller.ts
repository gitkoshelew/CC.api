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
    const res = await this.quizService.createQuiz(createQuizDto);
    this.notificationService.created(
      NotificationTarget.QUIZ,
      JSON.stringify(createQuizDto),
    );
    return res;
  }

  @ApiOperation({ summary: 'Method add question to quiz' })
  @ApiResponse({ status: 201, type: Quiz_Question })
  @Put('/add')
  async addQuestionToQuiz(@Body() dto: AddQuestionDto) {
    const res = await this.quizService.addQuestionToQuiz(dto);
    this.notificationService.created(
      NotificationTarget.QUESTION,
      JSON.stringify(dto),
    );
    return res;
  }

  @ApiOperation({ summary: 'Method to delete question by id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async deleteQuizById(@Param('id') id: number) {
    const res = await this.quizService.deleteQuizById(id);
    this.notificationService.deleted(NotificationTarget.QUIZ, id);
    return res;
  }
}
