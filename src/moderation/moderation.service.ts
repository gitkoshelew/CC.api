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
    const moderationList = await this.moderationRepository.findAll({
      include: { all: true },
    });

    if (!moderationList) {
      throw CustomErrorHandler.InternalServerError('Server problems');
    }
    return moderationList;
  }

  async getModerationById(id: number) {
    const moderation = await this.moderationRepository.findOne({
      where: { id },
      include: { all: true },
    });

    if (!moderation) {
      throw CustomErrorHandler.BadRequest("Id doen't exist");
    }
    return moderation;
  }

  async deleteModerationById(id: number) {
    const permission = await this.moderationRepository.findOne({
      where: { id },
    });
    await permission.destroy();
    return await this.moderationRepository.findAll({ include: { all: true } });
  }
}
