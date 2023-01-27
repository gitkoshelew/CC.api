import { Module } from '@nestjs/common';
import { NotificationsService } from './services/notifications.service';

@Module({
  imports: [],
  controllers: [],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class SharedModule {}
