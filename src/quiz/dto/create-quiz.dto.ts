import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({ example: 1, description: 'foreign key' })
  readonly authorId: number;
  @ApiProperty({
    example: 'NodeJS',
    description: 'required name / not uniq / string',
  })
  readonly title: string;
  @ApiProperty({
    example: 'Some description and/or information of quiz',
    description: 'required field / not uniq / string',
  })
  readonly description: string;
}
