export enum QuestionTypes {
  SINGLE = 'SINGLE',
  MULTIPLY = 'MULTIPLY',
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
}
