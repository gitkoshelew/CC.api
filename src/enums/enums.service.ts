import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from 'src/questions/questions.model';
import { DifficultyTypes, QuestionTypes } from 'src/questions/questions.types';

@Injectable()
export class EnumsService {
  constructor() {}

  getQuestionsTypes() {
    return QuestionTypes;
  }

  getDifficultyTypes() {
    return DifficultyTypes;
  }
}
