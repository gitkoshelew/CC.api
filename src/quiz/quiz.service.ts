import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateQuizDto } from './dto/create-quiz.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Quiz } from './quiz.model';
import { AddQuestionDto } from './dto/addQuestion.dto';
import { QuestionsService } from "../questions/questions.service";

@Injectable()
export class QuizService {

  constructor(@InjectModel(Quiz) private quizRepository: typeof Quiz,
              private questionService: QuestionsService) {}

  async getAll() {
    const quizs = await this.quizRepository.findAll({include: {all: true}});
    return quizs
  }

  async getById(id: number) {
    const quiz = await this.quizRepository.findOne({where: {id}, include: {all: true}});
    return quiz;
  }

  async createQuiz(createQuizDto: CreateQuizDto) {
    const quiz = await this.quizRepository.create(createQuizDto)
    return quiz
  }

  async addQuestionToQuiz(dto: AddQuestionDto) {
    const quiz = await this.getById(dto.quizId)
    const question = await this.questionService.getQuestionById(dto.questionId)
    if (quiz && question) {
      return await quiz.$add('question', question.id);
    }
    throw new HttpException('There is no quiz or question with that id', HttpStatus.NOT_FOUND)
  }
}
