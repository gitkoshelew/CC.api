import { ModerationStatus } from '../moderation.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateModerationDto {
  @ApiProperty({
    example: 'Rewrite please some points that were doubt',
    description: 'comment what to do / string',
  })
  @IsNotEmpty()
  readonly comment: string;
  @ApiProperty({
    example: 'rewrite',
    description: 'enum status (rewrite/change/block / enum',
  })
  readonly status: ModerationStatus;
}
