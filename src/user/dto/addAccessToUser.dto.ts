import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// <Remark>
// rename the file to add-access-to-user
// This is not a component. This is dto
// Why create-user.dto.ts and addAccessToUser.dto.ts have different notation?
// Maybe we can introduce just index.ts, where all dtos for user module are introduced

export class AddAccessDto {
  @ApiProperty({
    example: 1,
    description: 'find user by id to add access / required',
  })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({
    example: 1,
    description: 'add access to user by id of access / required',
  })
  @IsNotEmpty()
  readonly accessGroupId: number;
}
