import { ApiProperty } from "@nestjs/swagger";

export class AddQuestionDto {
  @ApiProperty({example: '1', description: 'quiz id that we should take'})
  readonly quizId: number;
  @ApiProperty({example: '1', description: 'question id that we should add to quiz'})
  readonly questionId: number;
}
