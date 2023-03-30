import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Quiz } from './quiz.model';
import { AddQuestionDto } from './dto/addQuestion.dto';
import { QuestionsService } from '../questions/questions.service';
import { ErrorHandler } from 'src/utils/error-handler';
import { ModerationService } from 'src/moderation/moderation.service';
import { ModerationStatus } from 'src/moderation/moderation.model';
import { AddModerationToQuestionDto } from 'src/quiz/dto/addModerationToQuiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz) private quizRepository: typeof Quiz,
    @Inject(forwardRef(() => QuestionsService))
    private questionService: QuestionsService,
    private moderationService: ModerationService,
  ) {}

  async getAll() {
    try {
      return this.quizRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.InternalServerError('Server problems');
    }
  }

  async getById(id: number) {
    try {
      return this.quizRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.BadRequest("Quiz with this id doen't exist");
    }
  }

  async createQuiz(dto: CreateQuizDto) {
    try {
      const newQuiz = {
        ...dto,
        creationDate: new Date().toISOString(),
      };
      const quiz = await this.quizRepository.create(newQuiz);
      const moderation = await this.moderationService.createModerationStatus({
        comment: 'new question',
        status: ModerationStatus.review,
      });
      if (quiz && moderation) {
        await quiz.$set('moderation', quiz.id);
        return quiz;
      }
    } catch (error) {
      throw ErrorHandler.BadRequest(error);
    }
  }

  async addQuestionToQuiz(dto: AddQuestionDto) {
    try {
      const quiz = await this.getById(dto.quizId);
      const question = await this.questionService.getQuestionById(
        dto.questionId,
      );
      return await quiz.$add('question', question.id);
    } catch (error) {
      throw ErrorHandler.BadRequest(
        'Check properties of selected question or quiz',
      );
    }
  }

  async deleteQuizById(id: number, userId: number) {
    try {
      const quiz = await this.getById(id);
      if (quiz.authorId !== userId) {
        throw ErrorHandler.Forbidden("You don't have permission");
      }
      await quiz.destroy();
    } catch (error) {
      throw ErrorHandler.BadRequest("Quiz with this id doen't exist");
    }
  }

  async addModerationToQuestion(dto: AddModerationToQuestionDto) {
    try {
      const quiz = await this.getById(dto.quizId);
      const moderation = await this.moderationService.getModerationById(
        dto.moderationId,
      );
      return await quiz.$set('moderation', moderation.id);
    } catch (error) {
      throw ErrorHandler.BadRequest(
        'Check properties of selected moderation or question',
      );
    }
  }
}
