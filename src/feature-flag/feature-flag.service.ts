import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FeatureFlag } from './feature-flag.model';

@Injectable()
export class FeatureFlagService {
  constructor(
    @InjectModel(FeatureFlag) private featureFlagRepository: typeof FeatureFlag,
  ) {}
}
