import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Quiz } from './quiz.model';
import { AddQuestionDto } from './dto/addQuestion.dto';
import { Put } from '@nestjs/common/decorators';
import { Quiz_Question } from './quiz.question.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserInReq } from '../auth/decorators/users.decorator';
import { UserReqDto } from '../auth/dto/user-req.dto';

@ApiTags('Quiz')
@Controller('/api/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Method to create new quiz' })
  @ApiResponse({ status: 201, type: Quiz })
  @ApiResponse({
    status: 401,
    description: 'If user is not authorized',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createQuizDto: CreateQuizDto, @UserInReq() user: UserReqDto) {
    return this.quizService.createQuiz({
      ...createQuizDto,
      authorId: user.userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Method add question to quiz' })
  @ApiResponse({ status: 201, type: Quiz_Question })
  @ApiResponse({
    status: 401,
    description: 'If user is not authorized',
  })
  @Put('/add')
  addQuestionToQuiz(@Body() dto: AddQuestionDto) {
    return this.quizService.addQuestionToQuiz(dto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Method to delete question by id' })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 401,
    description: 'If user is not authorized',
  })
  @ApiResponse({
    status: 403,
    description: 'If try delete the quiz that is not your own',
  })
  @Delete(':id')
  deleteQuizById(@Param('id') id: number, @UserInReq() user: UserReqDto) {
    return this.quizService.deleteQuizById(id, user.userId);
  }
}
