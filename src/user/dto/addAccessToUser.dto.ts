import { ApiProperty } from '@nestjs/swagger';

export class AddAccessDto {
  @ApiProperty({
    example: 1,
    description: 'find user by id to add access / required',
  })
  readonly userId: number;
  @ApiProperty({
    example: 1,
    description: 'add access to user by id of access / required',
  })
  readonly accessGroupId: number;
}
