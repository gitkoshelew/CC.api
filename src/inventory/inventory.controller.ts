import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';

@ApiTags('Inventory')
@Controller('api/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({ summary: 'Method to get difficulty of questions' })
  @ApiResponse({ status: 201 })
  @Get('difficulty')
  async getDifficultyTypes() {
    return this.inventoryService.getDifficultyTypes();
  }

  @ApiOperation({ summary: 'Method to get types of questions' })
  @ApiResponse({ status: 200 })
  @Get('types')
  async getQuestionsTypes() {
    return this.inventoryService.getQuestionsTypes();
  }

  @ApiOperation({ summary: 'Method to get all themes of quiz' })
  @ApiResponse({ status: 200 })
  @Get('themes')
  async getQuizThemes() {
    return this.inventoryService.getAllThemes();
  }
}
