import { Body, Controller, Post } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { CreateModerationDto } from './dto/create-moderation.dto';

@Controller('moderation')
export class ModerationController {
  constructor(private moderationService: ModerationService) {}
  @Post()
  create(@Body() moderationDto: CreateModerationDto) {
    return this.moderationService.createModerationStatus(moderationDto);
  }
}
