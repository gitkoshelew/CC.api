import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQuestionOptionDto } from './dto/create-questionOption.dto';
import { QuestionOptions } from './question-options.model';

@Injectable()
export class QuestionOptionsService {
  constructor(
    @InjectModel(QuestionOptions)
    private questionOptionRepository: typeof QuestionOptions,
  ) {}

  async createQuestionOption(dto: CreateQuestionOptionDto) {
    const questionOption = this.questionOptionRepository.create(dto);
    return questionOption;
  }
}
