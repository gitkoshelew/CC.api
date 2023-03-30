import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ErrorHandler } from 'src/utils/error-handler';
import { CreateQuestionOptionDto } from './dto/create-questionOption.dto';
import { QuestionOptions } from './question-options.model';

@Injectable()
export class QuestionOptionsService {
  constructor(
    @InjectModel(QuestionOptions)
    private questionOptionRepository: typeof QuestionOptions,
  ) {}

  async createQuestionOption(dto: CreateQuestionOptionDto) {
    try {
      return this.questionOptionRepository.create(dto);
    } catch (error) {
      throw ErrorHandler.NotFound(error);
    }
  }
}
