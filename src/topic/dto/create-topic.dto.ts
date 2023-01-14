import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicDto {
  @ApiProperty({
    example: 'NodeJS question',
    description: 'Simple sample for theme / required',
  })
  readonly title: string;
}
