import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FeatureAdminService } from './feature-admin.service';
import { Delete, Put } from '@nestjs/common/decorators';
import { CreateFeatureAdminDto } from './dto/create-feature-admin.dto';

@Controller('api/feature-admin')
export class FeatureAdminController {
  constructor(private featureAdminService: FeatureAdminService) {}

  @Post()
  create(@Body() dto: CreateFeatureAdminDto) {
    return this.featureAdminService.createFeatureAdmin(dto);
  }

  @Get()
  getAllFeatures() {
    return this.featureAdminService.getAllFeaturesAdmin();
  }

  @Get(':id')
  getFeatureById(@Param('id') id: number) {
    return this.featureAdminService.getOneFeatureAdmin(id);
  }

  @Delete(':id')
  deleteFeature(@Param('id') id: number) {
    return this.featureAdminService.deleteFeatureAdminById(id);
  }

  @Put(':id')
  updateFeature(@Body() dto: CreateFeatureAdminDto, @Param('id') id: number) {
    return this.featureAdminService.updateFeatureAdmin(dto, id);
  }
}
