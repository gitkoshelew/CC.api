import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DifficultyTypes, QuestionTypes } from 'src/questions/questions.types';
import { EnumsService } from './enums.service';

@ApiTags('Enums')
@Controller('api/enums')
export class EnumsController {
  constructor(private readonly enumsSerivce: EnumsService) {}

  @ApiOperation({ summary: 'Method to get difficulty of questions' })
  @ApiResponse({ status: 201, type: QuestionTypes })
  @Get('difficulty')
  getDifficultyTypes() {
    return this.enumsSerivce.getDifficultyTypes();
  }

  @ApiOperation({ summary: 'Method to get types of questions' })
  @ApiResponse({ status: 200, type: DifficultyTypes })
  @Get('types')
  getQuestionsTypes() {
    return this.enumsSerivce.getQuestionsTypes();
  }
}
