import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DifficultyTypes, QuestionTypes } from 'src/questions/questions.types';
import { Quiz } from 'src/quiz/quiz.model';

@Injectable()
export class InventoryService {
  constructor(@InjectModel(Quiz) private quizRepository: typeof Quiz) {}

  async getAllThemes() {
    return await this.quizRepository.findAll({
      attributes: ['title'],
    });
  }

  getQuestionsTypes() {
    return QuestionTypes;
  }

  getDifficultyTypes() {
    return DifficultyTypes;
  }
}
