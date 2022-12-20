export class CreateQuizDto {
  readonly testTitle: string;
  readonly testDescription: string;
  readonly theme: string;
  readonly questions: Array<Question>;
}
class Question {
  question: string;
  hasSeveralCorrectAnswers: boolean;
  answers: Array<string>;
  rightAnswers: Array<string>;
}
