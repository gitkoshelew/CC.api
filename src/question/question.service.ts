import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Question } from "./question.model";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { ModerationService } from "../moderation/moderation.service";
import { ModerationStatus } from "../moderation/moderation.model";

@Injectable()
export class QuestionService {
  constructor(@InjectModel(Question) private questionRepository: typeof Question,
                                    private moderationRepository: ModerationService) {}

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
    const moderation = await this.moderationRepository.createModeration({comment: '', status: ModerationStatus.review, questionId: question.id})
      await question.$set('moderation', moderation)
    return question
  }

}
