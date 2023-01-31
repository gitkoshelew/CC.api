import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({
    example: 'NodeJS',
    description: 'required name / not uniq / string',
  })
  readonly title: string;
}

export class CreateQuizDBModel {
  readonly authorId: number;
  readonly title: string;
}
