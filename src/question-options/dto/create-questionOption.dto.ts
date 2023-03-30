import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionOptionDto {
  @ApiProperty({
    example: 'options',
    description: 'write options of question',
  })
  name: string;
  @ApiProperty({
    example: '1',
    description: 'id of question',
  })
  questionId: number;
}
