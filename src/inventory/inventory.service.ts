import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DifficultyTypes, QuestionTypes } from 'src/questions/questions.types';
import { Quiz } from 'src/quiz/quiz.model';
import { ErrorHandler } from 'src/utils/error-handler';

@Injectable()
export class InventoryService {
  constructor(@InjectModel(Quiz) private quizRepository: typeof Quiz) {}

  async getAllThemes() {
    try {
      return this.quizRepository.findAll({
        attributes: ['title'],
      });
    } catch (error) {
      throw ErrorHandler.InternalServerError('Server problems');
    }
  }

  getQuestionsTypes() {
    try {
      return QuestionTypes;
    } catch (error) {
      throw ErrorHandler.InternalServerError('Server problems');
    }
  }

  getDifficultyTypes() {
    try {
      return DifficultyTypes;
    } catch (error) {
      throw ErrorHandler.InternalServerError('Server problems');
    }
  }
}
