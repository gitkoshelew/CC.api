import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Question } from './questions.model';
import { Put } from '@nestjs/common/decorators';
import { AddModerationToQuestionDto } from './dto/addModerationToQuestion.dto';
import { NotificationsService } from 'src/shared/services/notifications.service';
import { NotificationTarget } from 'src/shared/types/notificationTarget.enum';

@ApiTags('Question')
@Controller('api/questions')
export class QuestionsController {
  constructor(
    private questionService: QuestionsService,
    private readonly notificationService: NotificationsService,
  ) {}

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

  @ApiOperation({ summary: 'Method to create question' })
  @ApiResponse({ status: 201, type: Question })
  @Post()
  async create(@Body() dto: CreateQuestionDto) {
    const res = await this.questionService.createQuestion(dto);
    this.notificationService.created(NotificationTarget.QUESTION, dto);
    return res;
  }

  @ApiOperation({ summary: 'Method to delete question' })
  @ApiResponse({ status: 200, type: Question })
  @Delete('/:id')
  async deleteById(@Param('id') id: number) {
    const res = await this.questionService.deleteQuestionById(id);
    this.notificationService.deleted(NotificationTarget.QUESTION, res);
    return res;
  }

  @ApiOperation({ summary: 'add moderation to question' })
  @ApiResponse({ status: 200, type: Question })
  @Put('/add')
  addPermissionToAccessGroup(@Body() dto: AddModerationToQuestionDto) {
    return this.questionService.addModerationToQuestion(dto);
  }
}
