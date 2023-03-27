import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddQuestionDto {
  @ApiProperty({ example: 1, description: 'quiz id that we should take' })
  @IsNotEmpty()
  readonly quizId: number;
  @ApiProperty({
    example: 1,
    description: 'question id that we should add to quiz',
  })
  @IsNotEmpty()
  readonly questionId: number;
}
