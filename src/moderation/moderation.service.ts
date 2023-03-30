import { Injectable } from '@nestjs/common';
import { CreateModerationDto } from './dto/create-moderation.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Moderation } from './moderation.model';
import { ErrorHandler } from 'src/utils/error-handler';

@Injectable()
export class ModerationService {
  constructor(
    @InjectModel(Moderation) private moderationRepository: typeof Moderation,
  ) {}

  async createModerationStatus(dto: CreateModerationDto) {
    try {
      return this.moderationRepository.create(dto);
    } catch (error) {
      throw ErrorHandler.BadRequest(error);
    }
  }

  async getAllStatus() {
    try {
      return this.moderationRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.InternalServerError('Server problems');
    }
  }

  async getModerationById(id: number) {
    try {
      return this.moderationRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.BadRequest("Moderation with this id doen't exist");
    }
  }

  async deleteModerationById(id: number) {
    try {
      const moderation = await this.getModerationById(id);
      await moderation.destroy();
      return this.moderationRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.BadRequest("Moderation with this id doen't exist");
    }
  }
}
