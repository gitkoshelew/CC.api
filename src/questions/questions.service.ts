import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './questions.model';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ModerationService } from '../moderation/moderation.service';
import { AddModerationToQuestionDto } from './dto/addModerationToQuestion.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question) private questionRepository: typeof Question,
    private moderationRepository: ModerationService,
  ) {}

  async createQuestion(dto: CreateQuestionDto) {
    return await this.questionRepository.create(dto);
  }

  async deleteQuestionById(id: number) {
    return await this.questionRepository.destroy({ where: { id } });
  }

  async getQuestionById(id: number) {
    return await this.questionRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async getAllQuestions() {
    return await this.questionRepository.findAll({ include: { all: true } });
  }

  async addModerationToQuestion(dto: AddModerationToQuestionDto) {
    const question = await this.getQuestionById(dto.questionId);
    const moderation = await this.moderationRepository.getModerationById(
      dto.moderationId,
    );
    if (question && moderation) {
      return await question.$set('moderation', moderation.id);
    }
  }
}
