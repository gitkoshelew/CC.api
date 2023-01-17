import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicDto {
  @ApiProperty({
    example: 'NodeJS',
    description: 'Simple sample for theme / required',
  })
  readonly title: string;
}
