import { ApiProperty } from "@nestjs/swagger";

export class AddPermissionDto {
  @ApiProperty({example: 1, description: 'find access group by id to add permission / required'})
  readonly accessId: number
  @ApiProperty({example: 1, description: 'add permission to access group by id of permission / required'})
  readonly permissionId: number
}
