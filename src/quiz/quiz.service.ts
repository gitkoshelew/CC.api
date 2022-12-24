import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  getAll(): string {
    return 'All quiz';
  }

  getById(id: string): string {
    return `only one quiz with id = ${id}`;
  }
  createQuiz(createQuizDto: CreateQuizDto): string {
    return `Quiz ${createQuizDto.testTitle} was successfully created`;
  }
}
