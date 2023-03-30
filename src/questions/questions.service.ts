import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './questions.model';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ErrorHandler } from 'src/utils/error-handler';
import { QuizService } from 'src/quiz/quiz.service';
import { CreateQuestionForQuizDto } from './dto/create-question-quiz.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question) private questionRepository: typeof Question,
    @Inject(forwardRef(() => QuizService))
    private quizService: QuizService,
  ) {}

  async createQuestion(dto: CreateQuestionDto) {
    try {
      return await this.questionRepository.create(dto);
    } catch (error) {
      throw ErrorHandler.BadRequest(error);
    }
  }

  async createQuestionForQuiz(dto: CreateQuestionForQuizDto) {
    const { quizId, ...questionDto } = dto;
    const question = await this.createQuestion(questionDto);
    return this.quizService.addQuestionToQuiz({
      quizId: quizId,
      questionId: question.id,
    });
  }

  async deleteQuestionById(id: number) {
    try {
      const question = await this.getQuestionById(id);
      await question.destroy();
      return this.questionRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.BadRequest("Question with this id doen't exist");
    }
  }

  async getQuestionById(id: number) {
    try {
      return this.questionRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.BadRequest("Question with this id doen't exist");
    }
  }

  async getAllQuestions() {
    try {
      return this.questionRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.InternalServerError('Server problems');
    }
  }
}
