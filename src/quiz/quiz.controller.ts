import { Controller, Get, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';

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
}
