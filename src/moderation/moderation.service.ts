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
}
