import { ApiProperty } from "@nestjs/swagger";

export class CreatePermissionDto {
  @ApiProperty({example: 'create/update/moderate questions', description: 'permissions to user'})
  readonly name: string;
}
