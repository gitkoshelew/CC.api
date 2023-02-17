import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'admin/moderator/user/tester',
    description: 'permissions to user',
    required: true,
  })
  @IsNotEmpty()
  readonly name: string;
}
