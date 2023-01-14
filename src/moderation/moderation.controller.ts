import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { CreateModerationDto } from './dto/create-moderation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Moderation } from './moderation.model';

@ApiTags('Moderation')
@Controller('api/moderation')
export class ModerationController {
  constructor(private moderationService: ModerationService) {}

  @ApiOperation({ summary: 'Method to create moderation status' })
  @ApiResponse({ status: 201, type: Moderation })
  @Post()
  create(@Body() dto: CreateModerationDto) {
    return this.moderationService.createModerationStatus(dto);
  }

  @ApiOperation({ summary: 'Method to get all status checkpoints' })
  @ApiResponse({ status: 200, type: [Moderation] })
  @Get()
  getAllStatuses() {
    return this.moderationService.getAllStatus();
  }
}
