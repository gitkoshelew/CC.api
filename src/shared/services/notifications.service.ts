import { NotificationTarget } from './../types/notificationTarget.enum';
import { RMQService } from 'nestjs-rmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  name: 'notifications';
  constructor(private readonly rmqService: RMQService) {}

  public async created(notificationTarget: NotificationTarget, message: any) {
    await this.notify(notificationTarget + '.created', message);
  }
  public async updated(notificationTarget: NotificationTarget, message: any) {
    await this.notify(notificationTarget + '.updated', message);
  }
  public async deleted(notificationTarget: NotificationTarget, message: any) {
    await this.notify(notificationTarget + '.deleted', message);
  }
  private async notify(topic: string, message: any) {
    await this.rmqService.send(this.name + '.' + topic, Buffer.from(message), {
      persistent: true,
    });
  }
}
