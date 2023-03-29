import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CorrectAnswers } from './correct-answer.model';
import { CreateCorrectAnswerDto } from './dto/create-correctAnswer.dto';

@Injectable()
export class CorrectAnswerService {
  constructor(
    @InjectModel(CorrectAnswers)
    private correctAnswerRepository: typeof CorrectAnswers,
  ) {}

  async createCorrectAnswer(dto: CreateCorrectAnswerDto) {
    const correctAnswer = this.correctAnswerRepository.create(dto);
    return correctAnswer;
  }
}
