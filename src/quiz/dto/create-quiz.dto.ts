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
}

export class CreateQuizDBModel {
  readonly authorId: number;
  readonly title: string;
}
