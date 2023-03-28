export class CreateFeatureAdminDto {
  readonly title: string;
  readonly description: string;
  readonly adminPortalFeatureStatus: boolean;
  readonly userPortalFeatureStatus: boolean;
  readonly mobilePortalFeatureStatus: boolean;
}
