import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Quiz } from './quiz.model';
import { AddQuestionDto } from './dto/addQuestion.dto';
import { QuestionsService } from '../questions/questions.service';
import { CustomErrorHandler } from 'src/utils/custom-error-handler';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz) private quizRepository: typeof Quiz,
    private questionService: QuestionsService,
  ) {}

  async getAll() {
    try {
      const quizList = await this.quizRepository.findAll({
        include: { all: true },
      });
      return quizList;
    } catch (error) {
      throw CustomErrorHandler.InternalServerError('Server problems');
    }
  }

  async getById(id: number) {
    try {
      const quiz = await this.quizRepository.findOne({
        where: { id },
        include: { all: true },
      });
      return quiz;
    } catch (error) {
      throw CustomErrorHandler.BadRequest("Quiz with this id doen't exist");
    }
  }

  async createQuiz(createQuizDto: CreateQuizDto) {
    try {
      const create = this.quizRepository.create(createQuizDto);
      const quiz = await create;
      return quiz;
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

  async deleteQuizById(id: number) {
    try {
      const quiz = await this.quizRepository.findOne({
        where: { id },
      });
      await quiz.destroy();
      return this.quizRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw CustomErrorHandler.BadRequest("Quiz with this id doen't exist");
    }
  }
}
