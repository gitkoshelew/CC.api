import { ApiProperty } from "@nestjs/swagger";

export class CreatePermissionDto {
    @ApiProperty({example: 'admin/moderator/user/tester', description: 'permissions to user'})
    readonly name: string
}
