export enum QuestionTypes {
  SINGLE = 'single',
  MULTI = 'multi',
}

export enum DifficultyTypes {
  LIGHT = 'light',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface QuestionCreationAttrs {
  title: string;
  content: JSON;
  type: QuestionTypes;
  difficulty: DifficultyTypes;
  description: string;
  correctAnswer: string;
  topic: string;
}
