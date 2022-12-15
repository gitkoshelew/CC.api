import { Controller, Get, Param } from "@nestjs/common";
import { QuizService } from "./quiz.service";

@Controller('/api')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('/quiz')
  getQuiz(): string {
    return this.quizService.getQuiz()
  }

  @Get('/quiz/:id')
  getOneQuiz(@Param('id') id : string): string {
    return this.quizService.getOneQuiz(id)
  }
}
