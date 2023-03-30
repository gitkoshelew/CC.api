import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// <Remark>
// index.ts with dtos within this module
// inconsistent file naming
export class AddPermissionDto {
  @ApiProperty({
    example: 1,
    description: 'find access group by id to add permission / required',
  })
  @IsNotEmpty()
  readonly accessId: number;
  @ApiProperty({
    example: 1,
    description:
      'add permission to access group by id of permission / required',
  })
  @IsNotEmpty()
  readonly permissionId: number;
}
