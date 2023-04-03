import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetPostData {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  id: number;

  @ApiProperty({ example: 'Create profile page', description: 'Feature Title' })
  isOrderEditingEnabled: string;

  @ApiProperty({
    example: 'Create profile page with avatar',
    description: 'Feature description',
  })
  description: string;

  @ApiProperty({ example: false, description: 'Admin Portal Feature Status' })
  adminPortalFeatureStatus: boolean;

  @ApiProperty({ example: false, description: 'User Portal Feature Status' })
  userPortalFeatureStatus: boolean;

  @ApiProperty({ example: false, description: 'Mobile Portal Feature Status' })
  mobilePortalFeatureStatus: boolean;

  @ApiProperty({
    example: '2000-01-01T00:00:00.123Z',
    description: 'Creation Time',
  })
  createdAt: string;

  @ApiProperty({
    example: '2000-01-01T00:00:00.123Z',
    description: 'Update Time',
  })
  updatedAt: string;
}

export class ResponseGetUserData {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  id: number;

  @ApiProperty({ example: 'Create profile page', description: 'Feature Title' })
  isOrderEditingEnabled: string;

  @ApiProperty({ example: false, description: 'User Portal Feature Status' })
  userPortalFeatureStatus: boolean;
}

export class ResponseGetMobileData {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  id: number;

  @ApiProperty({ example: 'Create profile page', description: 'Feature Title' })
  isOrderEditingEnabled: string;

  @ApiProperty({ example: false, description: 'Mobile Portal Feature Status' })
  mobilePortalFeatureStatus: boolean;
}
