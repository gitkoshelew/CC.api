import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './questions.model';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ModerationService } from '../moderation/moderation.service';
import { AddModerationToQuestionDto } from './dto/addModerationToQuestion.dto';
import { CustomErrorHandler } from 'src/utils/custom-error-handler';
import { ModerationStatus } from '../moderation/moderation.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question) private questionRepository: typeof Question,
    private moderationRepository: ModerationService,
  ) {}

  async createQuestion(dto: CreateQuestionDto) {
    try {
     const question = await this.questionRepository.create(dto);
    const moderation = await this.moderationRepository.createModerationStatus({
      comment: 'new question',
      status: ModerationStatus.review,
    });
    if (question && moderation) {
      return await question.$set('moderation', question.id);
    } catch (error) {
      throw CustomErrorHandler.BadRequest(error.parent.detail);
    }
  }

  async deleteQuestionById(id: number) {
    try {
      const question = await this.questionRepository.findOne({
        where: { id },
      });
      await question.destroy();
      return this.questionRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw CustomErrorHandler.BadRequest("Question with this id doen't exist");
    }
  }

  async getQuestionById(id: number) {
    try {
      const question = await this.questionRepository.findOne({
        where: { id },
        include: { all: true },
      });
      return question;
    } catch (error) {
      throw CustomErrorHandler.BadRequest("Question with this id doen't exist");
    }
  }

  async getAllQuestions() {
    try {
      const questionList = await this.questionRepository.findAll({
        include: { all: true },
      });
      return questionList;
    } catch (error) {
      throw CustomErrorHandler.InternalServerError('Server problems');
    }
  }

  async addModerationToQuestion(dto: AddModerationToQuestionDto) {
    try {
      const question = await this.getQuestionById(dto.questionId);
      const moderation = await this.moderationRepository.getModerationById(
        dto.moderationId,
      );
      return await question.$set('moderation', moderation.id);
    } catch (error) {
      throw CustomErrorHandler.BadRequest(
        'Check properties of selected moderation or question',
      );
    }
  }
}
