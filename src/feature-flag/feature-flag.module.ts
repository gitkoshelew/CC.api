import { Module } from '@nestjs/common';
import { FeatureFlagService } from './feature-flag.service';
import { FeatureFlagController } from './feature-flag.controller';

@Module({
  providers: [FeatureFlagService],
  controllers: [FeatureFlagController],
})
export class FeatureFlagModule {}
