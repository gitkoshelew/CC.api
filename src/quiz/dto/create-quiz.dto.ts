import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
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

  @ApiProperty({
    example: 1,
    description: 'topic of the question / required',
  })
  readonly topicId: number;
}

export class CreateQuizDBModel {
  readonly authorId: number;
  readonly title: string;
}
