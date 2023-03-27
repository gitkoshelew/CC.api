import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
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
