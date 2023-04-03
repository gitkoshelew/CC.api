import { ApiProperty } from '@nestjs/swagger';

export class UpdateFeatureAdminDto {
  @ApiProperty({ example: 'Create profile page', description: 'Feature title' })
  readonly isOrderEditingEnabled: string;

  @ApiProperty({
    example: 'Create profile page with avatar',
    description: 'Feature description',
  })
  readonly description: string;

  @ApiProperty({ example: 'true', description: 'Admin feature status flag' })
  readonly adminPortalFeatureStatus: boolean;

  @ApiProperty({ example: 'true', description: 'User feature status flag' })
  readonly userPortalFeatureStatus: boolean;

  @ApiProperty({ example: 'true', description: 'Mobile feature status flag' })
  readonly mobilePortalFeatureStatus: boolean;
}
