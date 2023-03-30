import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CorrectAnswers } from './correct-answer.model';
import { CorrectAnswerService } from './correct-answer.service';
import { CreateCorrectAnswerDto } from './dto/create-correctAnswer.dto';

@ApiTags('Correct-answers')
@Controller('/api/correct-answer')
export class CorrectAnswerController {
  constructor(private correctAnswerService: CorrectAnswerService) {}

  @ApiOperation({ summary: 'Method to add correct answer to question' })
  @ApiResponse({ status: 200, type: CorrectAnswers })
  @Post()
  async create(@Body() dto: CreateCorrectAnswerDto) {
    return this.correctAnswerService.createCorrectAnswer(dto);
  }
}
