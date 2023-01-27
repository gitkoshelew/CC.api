import { Injectable } from '@nestjs/common';
import { DifficultyTypes, QuestionTypes } from 'src/questions/questions.types';

@Injectable()
export class InventoryService {
  constructor() {}

  getQuestionsTypes() {
    return QuestionTypes;
  }

  getDifficultyTypes() {
    return DifficultyTypes;
  }
}
