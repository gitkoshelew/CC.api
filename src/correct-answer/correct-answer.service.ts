import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ErrorHandler } from 'src/utils/error-handler';
import { CorrectAnswers } from './correct-answer.model';
import { CreateCorrectAnswerDto } from './dto/create-correctAnswer.dto';

@Injectable()
export class CorrectAnswerService {
  constructor(
    @InjectModel(CorrectAnswers)
    private correctAnswerRepository: typeof CorrectAnswers,
  ) {}

  async createCorrectAnswer(dto: CreateCorrectAnswerDto) {
    try {
      return this.correctAnswerRepository.create(dto);
    } catch (error) {
      throw ErrorHandler.BadRequest(error);
    }
  }
}
