import { ApiProperty } from '@nestjs/swagger';

export class CreateCorrectAnswerDto {
  @ApiProperty({
    example: 'options',
    description: 'write correct answer of question',
  })
  name: string;

  @ApiProperty({
    example: '1',
    description: 'id of question',
  })
  questionId: number;
}
