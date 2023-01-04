import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Question } from "./question.model";
import { CreateQuestionDto } from "./dto/create-question.dto";

@Injectable()
export class QuestionService {

  constructor(@InjectModel(Question) private questionRepository: typeof Question) {}

  async getAll() {
    const questions = await this.questionRepository.findAll();
    return questions
  }

  async getQuestionById(id: number) {
    const question = await this.questionRepository.findOne({where: {id}, include: {all: true}});
    return question;
  }

  async createQuestion(dto: CreateQuestionDto) {
    const question = await this.questionRepository.create(dto)
    return question
  }

}
