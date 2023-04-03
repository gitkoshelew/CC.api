import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FeatureAdminService } from './feature-admin.service';
import { Delete, Put } from '@nestjs/common/decorators';
import { CreateFeatureAdminDto } from './dto/create-feature-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ResponseGetMobileData,
  ResponseGetPostData,
  ResponseGetUserData,
} from './swagger-setup/api-property';
import { UpdateFeatureAdminDto } from './dto/update-feature-admin.dto';

@ApiTags('Features')
@Controller('api/feature-admin')
export class FeatureAdminController {
  constructor(private featureAdminService: FeatureAdminService) {}

  @ApiOperation({ summary: 'Feature creation' })
  @ApiResponse({ status: 201, type: ResponseGetPostData })
  @Post()
  create(@Body() dto: CreateFeatureAdminDto) {
    return this.featureAdminService.createFeatureAdmin(dto);
  }
  @ApiOperation({ summary: 'Getting all features' })
  @ApiResponse({ status: 200, type: [ResponseGetPostData] })
  @Get()
  getAllFeatures() {
    return this.featureAdminService.getAllFeaturesAdmin();
  }

  @ApiOperation({ summary: 'Getting all features with user flag' })
  @ApiResponse({ status: 200, type: [ResponseGetUserData] })
  @Get('user-portal')
  getUserPortalData() {
    return this.featureAdminService.getUserPortalFeaturesAdmin();
  }
  @ApiOperation({ summary: 'Get all features with mobile flag' })
  @ApiResponse({ status: 200, type: [ResponseGetMobileData] })
  @Get('mobile-portal')
  getMobilePortalData() {
    return this.featureAdminService.getMobilePortalFeaturesAdmin();
  }
  @ApiOperation({ summary: 'Getting one feature' })
  @ApiResponse({ status: 200, type: ResponseGetPostData })
  @Get(':id')
  getFeatureById(@Param('id') id: number) {
    return this.featureAdminService.getOneFeatureAdmin(id);
  }

  @ApiOperation({ summary: 'Removing a feature' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteFeature(@Param('id') id: number) {
    return this.featureAdminService.deleteFeatureAdminById(id);
  }
  @ApiOperation({ summary: 'Feature change' })
  @ApiResponse({ status: 200, type: ResponseGetPostData })
  @Put(':id')
  updateFeature(@Body() dto: UpdateFeatureAdminDto, @Param('id') id: number) {
    return this.featureAdminService.updateFeatureAdmin(dto, id);
  }
}
