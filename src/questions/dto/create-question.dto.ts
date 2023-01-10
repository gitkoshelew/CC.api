import { DifficultyTypes, QuestionTypes } from '../questions.types';

export class CreateQuestionDto {
  readonly title: string;
  readonly content: JSON;
  readonly type: QuestionTypes;
  readonly difficulty: DifficultyTypes;
  readonly description: string;
  readonly correctAnswer: string;
}
