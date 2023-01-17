import { ModerationStatus } from '../moderation.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModerationDto {
  @ApiProperty({
    example: 'Rewrite please some points that were doubt',
    description: 'comment what to do / string',
  })
  readonly comment: string;
  @ApiProperty({
    example: 'rewrite',
    description: 'enum status (rewrite/change/block / enum',
  })
  readonly status: ModerationStatus;
}
