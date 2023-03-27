import { Injectable } from '@nestjs/common';
import { CreateModerationDto } from './dto/create-moderation.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Moderation } from './moderation.model';
import { CustomErrorHandler } from 'src/utils/custom-error-handler';

@Injectable()
export class ModerationService {
  constructor(
    @InjectModel(Moderation) private moderationRepository: typeof Moderation,
  ) {}

  async createModerationStatus(dto: CreateModerationDto) {
    try {
      const create = this.moderationRepository.create(dto);
      const moderation = await create;
      return moderation;
    } catch (error) {
      throw CustomErrorHandler.BadRequest(error.errors[0].message);
    }
  }

  async getAllStatus() {
    try {
      const moderationList = await this.moderationRepository.findAll({
        include: { all: true },
      });
      return moderationList;
    } catch (error) {
      throw CustomErrorHandler.InternalServerError('Server problems');
    }
  }

  async getModerationById(id: number) {
    try {
      const moderation = await this.moderationRepository.findOne({
        where: { id },
        include: { all: true },
      });
      return moderation;
    } catch (error) {
      throw CustomErrorHandler.BadRequest(
        "Moderation with this id doen't exist",
      );
    }
  }

  async deleteModerationById(id: number) {
    try {
      const moderation = await this.moderationRepository.findOne({
        where: { id },
      });
      await moderation.destroy();
      return this.moderationRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw CustomErrorHandler.BadRequest(
        "Moderation with this id doen't exist",
      );
    }
  }
}
