import { ModerationStatus } from '../moderation.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// <Remark>
// index.ts with dtos within this module
export class CreateModerationDto {
  @ApiProperty({
    example: 'Rewrite please some points that were doubt',
    description: 'comment what to do / string',
  })
  @IsNotEmpty()
  readonly comment: string;
  @ApiProperty({
    example: 'rewrite',
    description: 'enum status (review/rewrite/change/block/accept) / enum',
  })
  readonly status: ModerationStatus;
}
