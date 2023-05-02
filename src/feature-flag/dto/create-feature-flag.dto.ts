export class CreateFeatureFlagDto {
  readonly featureId: number;
  readonly nextFeatureStatus: boolean;
  readonly angularFeatureStatus: boolean;
  readonly mobileFeatureStatus: boolean;
}
