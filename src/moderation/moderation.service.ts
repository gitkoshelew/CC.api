import { Injectable } from '@nestjs/common';
import { CreateModerationDto } from './dto/create-moderation.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Moderation } from './moderation.model';

@Injectable()
export class ModerationService {
  constructor(
    @InjectModel(Moderation) private moderationRepository: typeof Moderation,
  ) {}

  async createModerationStatus(dto: CreateModerationDto) {
    return await this.moderationRepository.create(dto);
  }

  async getAllStatus() {
    return await this.moderationRepository.findAll({ include: { all: true } });
  }

  async getModerationById(id: number) {
    return await this.moderationRepository.findOne({where: { id }})
  }

  async deleteModerationById(id: number) {
    const permission = await this.moderationRepository.findOne({
      where: { id },
    });
    await permission.destroy();
    return await this.moderationRepository.findAll({ include: { all: true } });
  }
}
