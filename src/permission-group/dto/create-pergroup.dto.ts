import { ApiProperty } from "@nestjs/swagger";

export class CreatePermissionGroupDto {
  @ApiProperty({example: 'stock user group', description: 'uniq name for permission group / required'})
  readonly name: string
}
