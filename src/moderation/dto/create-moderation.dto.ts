import { ModerationStatus } from '../moderation.model';

export class CreateModerationDto {
  readonly comment: string;
  readonly status: ModerationStatus;
}
