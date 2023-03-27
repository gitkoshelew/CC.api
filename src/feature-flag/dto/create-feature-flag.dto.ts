export class CreateFeatureFlagDto {
  readonly featureId: number;
  readonly portal: string;
  readonly status: boolean;
}
