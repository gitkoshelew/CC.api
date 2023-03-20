import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './questions.model';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ModerationService } from '../moderation/moderation.service';
import { AddModerationToQuestionDto } from './dto/addModerationToQuestion.dto';
import { ModerationStatus } from '../moderation/moderation.model';
import { CreateQuestionForQuizDto } from './dto/create-questionForQuiz.dto';
import { QuizService } from 'src/quiz/quiz.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question) private questionRepository: typeof Question,
    private moderationRepository: ModerationService,
    @Inject(forwardRef(() => QuizService))
    private quizService: QuizService,
  ) {}

  async createQuestion(dto: CreateQuestionDto) {
    const moderation = await this.moderationRepository.createModerationStatus({
      comment: 'new question',
      status: ModerationStatus.review,
    });
    const question = await this.questionRepository.create(dto);
    if (question && moderation) {
      return await question.$set('moderation', question.id);
    }
  }

  async createQuestionForQuiz(dto: CreateQuestionForQuizDto) {
    const { quizId, ...questionDto } = dto;
    // const t = await sequelize.transaction();
    const question = await this.createQuestion(questionDto);
    return this.quizService.addQuestionToQuiz({
      quizId: quizId,
      questionId: question.id,
    });
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
      return await question.$set('moderation', question.id);
    }
  }
}
