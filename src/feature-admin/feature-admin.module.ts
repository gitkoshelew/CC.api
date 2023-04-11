import { Module } from '@nestjs/common';
import { FeatureAdminController } from './feature-admin.controller';
import { FeatureAdminService } from './feature-admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FeatureAdmin } from './feature-admin.model';

@Module({
  controllers: [FeatureAdminController],
  providers: [FeatureAdminService],
  imports: [SequelizeModule.forFeature([FeatureAdmin])],
})
export class FeatureAdminModule {}
