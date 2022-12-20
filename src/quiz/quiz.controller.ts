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

@Controller('/api/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('/')
  getQuiz(): string {
    return this.quizService.getQuiz();
  }

  @Get('/:id')
  getOneQuiz(@Param('id') id: string): string {
    return this.quizService.getOneQuiz(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createQuizDto: CreateQuizDto): string {
    return this.quizService.createQuiz(createQuizDto);
  }
}
