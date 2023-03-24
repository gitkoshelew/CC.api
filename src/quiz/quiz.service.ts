import {
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

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz) private quizRepository: typeof Quiz,
    @Inject(forwardRef(() => QuestionsService))
    private questionService: QuestionsService,
  ) {}

  async getAll() {
    return await this.quizRepository.findAll({ include: { all: true } });
  }

  async getById(id: number) {
    return await this.quizRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async createQuiz(createQuizDBModel: CreateQuizDBModel) {
    return await this.quizRepository.create(createQuizDBModel);
  }

  async addQuestionToQuiz(dto: AddQuestionDto) {
    const quiz = await this.getById(dto.quizId);
    const question = await this.questionService.getQuestionById(dto.questionId);
    if (quiz && question) {
      return await quiz.$add('question', question.id);
    }
    throw new HttpException(
      'There is no quiz or question with that id',
      HttpStatus.NOT_FOUND,
    );
  }

  async deleteQuizById(id: number, userId: number) {
    const quiz = await this.getById(id);
    if (!quiz) throw new NotFoundException();
    if (quiz.authorId !== userId) throw new ForbiddenException();
    await quiz.destroy();
  }
}
