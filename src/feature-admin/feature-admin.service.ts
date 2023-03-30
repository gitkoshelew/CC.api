import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FeatureAdmin } from './feature-admin.model';
import { CreateFeatureAdminDto } from './dto/create-feature-admin.dto';
import { CustomErrorHandler } from '../utils/custom-error-handler';

@Injectable()
export class FeatureAdminService {
  constructor(
    @InjectModel(FeatureAdmin)
    private featureAdminRepository: typeof FeatureAdmin,
  ) {}

  async createFeatureAdmin(dto: CreateFeatureAdminDto) {
    try {
      return await this.featureAdminRepository.create(dto);
    } catch (e) {
      throw CustomErrorHandler.BadRequest(e.errors[0].message);
    }
  }
  async getAllFeaturesAdmin() {
    try {
      return await this.featureAdminRepository.findAll({
        include: { all: true },
      });
    } catch (e) {
      throw CustomErrorHandler.InternalServerError('Server problems');
    }
  }

  async getUserPortalFeaturesAdmin() {
    try {
      return await this.featureAdminRepository.findAll({
        attributes: {
          exclude: ['adminPortalFeatureStatus', 'mobilePortalFeatureStatus'],
        },
      });
    } catch (e) {
      throw CustomErrorHandler.InternalServerError('Server problems');
    }
  }

  async getOneFeatureAdmin(id: number) {
    try {
      return await this.featureAdminRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (e) {
      throw CustomErrorHandler.BadRequest(
        'Feature with this id does not exist',
      );
    }
  }

  async deleteFeatureAdminById(id: number) {
    try {
      const feature = await this.featureAdminRepository.findOne({
        where: { id },
      });
      await feature.destroy();
      return this.featureAdminRepository.findAll();
    } catch (e) {
      throw CustomErrorHandler.BadRequest(
        'Feature with this id does not exist',
      );
    }
  }

  async updateFeatureAdmin(dto: CreateFeatureAdminDto, id: number) {
    try {
      const feature = await this.featureAdminRepository.findOne({
        where: { id },
        include: { all: true },
      });
      await feature.update(dto);
      return this.featureAdminRepository.findAll();
    } catch (e) {
      throw CustomErrorHandler.BadRequest(
        'Feature with this id does not exist',
      );
    }
  }
}
