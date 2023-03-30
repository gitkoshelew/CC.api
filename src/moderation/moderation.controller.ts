import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { CreateModerationDto } from './dto/create-moderation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Moderation } from './moderation.model';
import { Delete } from '@nestjs/common/decorators';

@ApiTags('Moderation')
@Controller('api/moderation')
export class ModerationController {
  constructor(private moderationService: ModerationService) {}

  @ApiOperation({ summary: 'Method to create moderation status' })
  @ApiResponse({ status: 201, type: Moderation })
  @Post()
  async create(@Body() dto: CreateModerationDto) {
    return this.moderationService.createModerationStatus(dto);
  }

  @ApiOperation({ summary: 'Method to get all status checkpoints' })
  @ApiResponse({ status: 200, type: [Moderation] })
  @Get()
  async getAllModerations() {
    return this.moderationService.getAllStatus();
  }

  @ApiOperation({ summary: 'Method to get all status checkpoints' })
  @ApiResponse({ status: 200, type: Moderation })
  @Get(':id')
  async getModerationById(@Param('id') id: number) {
    return this.moderationService.getModerationById(id);
  }

  @ApiOperation({ summary: 'delete moderation' })
  @ApiResponse({ status: 200, type: Moderation })
  @Delete(':id')
  async deleteModeration(@Param('id') id: number) {
    return this.moderationService.deleteModerationById(id);
  }
}
