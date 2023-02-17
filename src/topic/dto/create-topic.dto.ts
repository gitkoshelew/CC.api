import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty({
    example: 'NodeJS',
    description: 'Simple sample for theme / required',
  })
  @IsNotEmpty()
  readonly title: string;
}
