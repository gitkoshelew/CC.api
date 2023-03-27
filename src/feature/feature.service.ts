import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Feature } from './feature.model';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { CustomErrorHandler } from '../utils/custom-error-handler';

@Injectable()
export class FeatureService {
  constructor(
    @InjectModel(Feature) private featureRepository: typeof Feature,
  ) {}
  async createFeature(dto: CreateFeatureDto) {
    try {
      return await this.featureRepository.create(dto);
    } catch (e) {
      throw CustomErrorHandler.BadRequest(e.errors[0].message);
    }
  }
  async getAllFeatures() {
    try {
      return await this.featureRepository.findAll({ include: { all: true } });
    } catch (e) {
      throw CustomErrorHandler.InternalServerError('Server problems');
    }
  }

  async getOneFeature(id: number) {
    try {
      return await this.featureRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (e) {
      throw CustomErrorHandler.BadRequest(
        'Feature with this id does not exist',
      );
    }
  }

  async deleteFeatureById(id: number) {
    try {
      const feature = await this.featureRepository.findOne({
        where: { id },
      });
      await feature.destroy();
      return this.featureRepository.findAll();
    } catch (e) {
      throw CustomErrorHandler.BadRequest(
        'Feature with this id does not exist',
      );
    }
  }

  async updateFeature(dto: CreateFeatureDto, id: number) {
    try {
      const feature = await this.featureRepository.findOne({
        where: { id },
        include: { all: true },
      });
      await feature.update(dto);
      return this.featureRepository.findAll();
    } catch (e) {
      throw CustomErrorHandler.BadRequest(
        'Feature with this id does not exist',
      );
    }
  }
}
