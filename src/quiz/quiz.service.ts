import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Quiz } from './quiz.model';
import { AddQuestionDto } from './dto/addQuestion.dto';
import { QuestionsService } from '../questions/questions.service';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz) private quizRepository: typeof Quiz,
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

  async createQuiz(createQuizDto: CreateQuizDto) {
    return await this.quizRepository.create(createQuizDto);
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

  async deleteQuizById(id: number) {
    const quiz = await this.getById(id);
    await quiz.destroy();
  }
}
