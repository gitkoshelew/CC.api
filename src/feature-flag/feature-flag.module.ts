import { Module } from '@nestjs/common';
import { FeatureFlagService } from './feature-flag.service';
import { FeatureFlagController } from './feature-flag.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Feature } from '../feature/feature.model';
import { FeatureFlag } from './feature-flag.model';

@Module({
  providers: [FeatureFlagService],
  controllers: [FeatureFlagController],
  imports: [SequelizeModule.forFeature([Feature, FeatureFlag])],
})
export class FeatureFlagModule {}
