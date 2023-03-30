import { ApiProperty } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';

export class CreateQuestionForQuizDto extends CreateQuestionDto {
  @ApiProperty({
    example: 1,
    description: 'quiz of the question / required',
  })
  readonly quizId: number;
}
