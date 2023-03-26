import { FlagTitle } from '../feature-flag.model';

export class CreateFeatureFlagDto {
  readonly featureId: number;
  readonly title: FlagTitle;
  readonly status: boolean;
}
