import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Question } from './questions.model';
import { Put } from '@nestjs/common/decorators';
import { AddModerationToQuestionDto } from './dto/addModerationToQuestion.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Question')
@Controller('api/questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @ApiOperation({ summary: 'Method to get all questions' })
  @ApiResponse({ status: 200, type: Question })
  @Get()
  getAll() {
    return this.questionService.getAllQuestions();
  }

  @ApiOperation({ summary: 'Method to get one question' })
  @ApiResponse({ status: 200, type: [Question] })
  @Get('/:id')
  getQuestionById(@Param('id') id: number) {
    return this.questionService.getQuestionById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Method to create question' })
  @ApiResponse({ status: 201, type: Question })
  @ApiResponse({
    status: 401,
    description: 'If user is not authorized',
  })
  @Post()
  create(@Body() dto: CreateQuestionDto) {
    return this.questionService.createQuestion(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Method to delete question' })
  @ApiResponse({ status: 200, type: Question })
  @ApiResponse({
    status: 401,
    description: 'If user is not authorized',
  })
  @Delete('/:id')
  deleteById(@Param('id') id: number) {
    return this.questionService.deleteQuestionById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'add moderation to question' })
  @ApiResponse({ status: 200, type: Question })
  @ApiResponse({
    status: 401,
    description: 'If user is not authorized',
  })
  @Put('/add')
  addPermissionToAccessGroup(@Body() dto: AddModerationToQuestionDto) {
    return this.questionService.addModerationToQuestion(dto);
  }
}
