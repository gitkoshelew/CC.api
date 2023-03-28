import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { Delete, Put } from '@nestjs/common/decorators';
import { AddModerationToQuestionDto } from '../questions/dto/addModerationToQuestion.dto';

@Controller('api/feature')
export class FeatureController {
  constructor(private featureService: FeatureService) {}

  @Post()
  create(@Body() dto: CreateFeatureDto) {
    return this.featureService.createFeature(dto);
  }

  @Get()
  getAllFeatures() {
    return this.featureService.getAllFeatures();
  }

  @Get(':id')
  getFeatureById(@Param('id') id: number) {
    return this.featureService.getOneFeature(id);
  }

  @Delete(':id')
  deleteFeature(@Param('id') id: number) {
    return this.featureService.deleteFeatureById(id);
  }

  @Put(':id')
  updateFeature(@Body() dto: CreateFeatureDto, @Param('id') id: number) {
    return this.featureService.updateFeature(dto, id);
  }
}
