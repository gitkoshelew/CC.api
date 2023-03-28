import { Controller } from '@nestjs/common';
import { FeatureFlagService } from './feature-flag.service';

@Controller('api/feature-flag')
export class FeatureFlagController {
  constructor(private featureFlagService: FeatureFlagService) {}
}
