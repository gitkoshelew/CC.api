import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
  getQuiz(): string {
    return 'All quiz';
  }

  getOneQuiz(id: string): string {
    return `only one quiz with id = ${id}`;
  }
}
