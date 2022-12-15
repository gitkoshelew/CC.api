import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getQuiz(): string {
    return 'All quiz'
  }

  getOneQuiz( id: string): string {
    return `only one quiz with id = ${id}`;
  }
}
