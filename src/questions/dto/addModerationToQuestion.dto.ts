import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// <Remark>
// index.ts should have all dtos related to questions module
// file naming is inconsistent
export class AddModerationToQuestionDto {
  @ApiProperty({
    example: 1,
    description: 'moderation that should be added to question',
  })
  @IsNotEmpty()
  readonly moderationId: number;
  @ApiProperty({
    example: 1,
    description: 'question id that should take moderation',
  })
  @IsNotEmpty()
  readonly questionId: number;
}
