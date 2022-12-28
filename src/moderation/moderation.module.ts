import { Module } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ModerationController } from './moderation.controller';
import { Moderation } from './moderation.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [ModerationService],
  controllers: [ModerationController],
  imports: [SequelizeModule.forFeature([Moderation])],
})
export class ModerationModule {}
