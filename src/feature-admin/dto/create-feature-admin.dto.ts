import { ApiProperty } from '@nestjs/swagger';

export class CreateFeatureAdminDto {
  @ApiProperty({ example: 'Create profile page', description: 'Feature title' })
  readonly isOrderEditingEnabled: string;

  @ApiProperty({
    example: 'Create profile page with avatar',
    description: 'Feature description',
  })
  readonly description: string;
  readonly adminPortalFeatureStatus: boolean;
  readonly userPortalFeatureStatus: boolean;
  readonly mobilePortalFeatureStatus: boolean;
}
