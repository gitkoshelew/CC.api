import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CorrectAnswerService } from './correct-answer.service';
import { CreateCorrectAnswerDto } from './dto/create-correctAnswer.dto';

@ApiTags('Correct-answers')
@Controller('/api/correct-answer')
export class CorrectAnswerController {
  constructor(private correctAnswerService: CorrectAnswerService) {}

  @Post()
  create(@Body() dto: CreateCorrectAnswerDto) {
    return this.correctAnswerService.createCorrectAnswer(dto);
  }
}
