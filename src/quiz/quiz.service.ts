import {
  // <Remark>
  // Remove unused imports
  ForbiddenException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuizDBModel } from './dto/create-quiz.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Quiz } from './quiz.model';
import { AddQuestionDto } from './dto/addQuestion.dto';
import { QuestionsService } from '../questions/questions.service';
import { CustomErrorHandler } from 'src/utils/custom-error-handler';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz) private quizRepository: typeof Quiz,
    @Inject(forwardRef(() => QuestionsService))
    private questionService: QuestionsService,
  ) {}

  async getAll() {
    try {
      // <Remark>
      // return result
      return await this.quizRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw CustomErrorHandler.InternalServerError('Server problems');
    }
  }

  async getById(id: number) {
    try {
      return await this.quizRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw CustomErrorHandler.BadRequest("Quiz with this id doen't exist");
    }
  }

  async createQuiz(createQuizDBModel: CreateQuizDBModel) {
    try {
      return await this.quizRepository.create(createQuizDBModel);
    } catch (error) {
      throw CustomErrorHandler.BadRequest(error.parent.detail);
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
      throw CustomErrorHandler.BadRequest(
        'Check properties of selected question or quiz',
      );
    }
  }

  async deleteQuizById(id: number, userId: number) {
    const quiz = await this.quizRepository.findOne({
      where: { id },
    });

    if (!quiz) {
      throw CustomErrorHandler.BadRequest("Quiz with this id doen't exist");
    }

    if (quiz.authorId !== userId) {
      // <Remark>
      // this error is caught by local catch
      // so that this error will be overriden by another one
      throw CustomErrorHandler.Forbidden("You don't have permission");
    }

    await quiz.destroy();
    // <Remark>
    // you need to use try catch block in controller for example
    // so that you can throw custom errors in services and catch them in controller
  }
}
