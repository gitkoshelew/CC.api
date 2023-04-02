export class CreateFeatureAdminDto {
  readonly isOrderEditingEnabled: string;
  readonly description: string;
  readonly adminPortalFeatureStatus: boolean;
  readonly userPortalFeatureStatus: boolean;
  readonly mobilePortalFeatureStatus: boolean;
}
