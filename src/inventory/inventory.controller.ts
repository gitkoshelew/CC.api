import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';

@ApiTags('Inventory')
@Controller('api/inventory')
export class InventoryController {
  constructor(private readonly inventorySerivce: InventoryService) {}

  @ApiOperation({ summary: 'Method to get difficulty of questions' })
  @ApiResponse({ status: 201 })
  @Get('difficulty')
  getDifficultyTypes() {
    return this.inventorySerivce.getDifficultyTypes();
  }

  @ApiOperation({ summary: 'Method to get types of questions' })
  @ApiResponse({ status: 200 })
  @Get('types')
  getQuestionsTypes() {
    return this.inventorySerivce.getQuestionsTypes();
  }
}
