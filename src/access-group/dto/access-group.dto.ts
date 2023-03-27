import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAccessGroupDto {
  @ApiProperty({
    example: 'stock user group',
    description: 'uniq name for permission group / required',
    required: true,
  })
  @IsNotEmpty()
  readonly name: string;
}
