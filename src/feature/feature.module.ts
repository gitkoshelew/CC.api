import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FeatureFlag } from '../feature-flag/feature-flag.model';
import { Feature } from './feature.model';

@Module({
  providers: [FeatureService],
  controllers: [FeatureController],
  imports: [SequelizeModule.forFeature([Feature, FeatureFlag])],
  exports: [FeatureService],
})
export class FeatureModule {}
