import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// <Remark>
// use index.ts for all dtos in this module
export class CreateTopicDto {
  @ApiProperty({
    example: 'NodeJS',
    description: 'Simple sample for theme / required',
  })
  @IsNotEmpty()
  readonly title: string;
}
