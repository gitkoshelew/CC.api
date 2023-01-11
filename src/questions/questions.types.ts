export enum QuestionTypes {
  SINGLE = 'SINGLE OPTION',
  MULTI = 'MULTI OPTION',
}

export enum DifficultyTypes {
  LIGHT = 'LIGHT',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface QuestionCreationAttrs {
  title: string;
  content: JSON;
  type: QuestionTypes;
  difficulty: DifficultyTypes;
  description: string;
  correctAnswer: string;
}
