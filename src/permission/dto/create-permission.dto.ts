import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// <Remark>
// index.ts with all dtos related to permission module
export class CreatePermissionDto {
  @ApiProperty({
    example: 'admin/moderator/user/tester',
    description: 'permissions to user',
    required: true,
  })
  @IsNotEmpty()
  readonly name: string;
}
