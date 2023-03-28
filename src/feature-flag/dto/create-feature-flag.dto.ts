import { Portals } from '../feature-flag.model';

export class CreateFeatureFlagDto {
  readonly featureId: number;
  readonly portal: Portals;
  readonly status: boolean;
}
