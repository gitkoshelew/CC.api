import { ApiProperty } from '@nestjs/swagger';

export class AddModerationToQuestionDto {
  @ApiProperty({ example: 1, description: 'moderation that should be added to question' })
  readonly moderationId: number;
  @ApiProperty({ example: 1, description: 'question id that should take moderation' })
  readonly questionId: number;
}
