import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty({
    example: 'NodeJS',
    description: 'required name / not uniq / string',
  })
  @IsNotEmpty()
  readonly title: string;
  @ApiProperty({
    example: 'Some description and/or information of quiz',
    description: 'required field / not uniq / string',
  })
  readonly description: string;

  @ApiProperty({
    example: 'Some quiz comment ',
    description: 'not required field / not uniq / string',
  })
  readonly comment: string;

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
