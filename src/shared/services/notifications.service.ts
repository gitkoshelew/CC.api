import { NotificationTarget } from '../types/notificationTarget.enum';
import { Injectable } from '@nestjs/common';
import { Channel, connect, Replies } from 'amqplib';

@Injectable()
export class NotificationsService {
  private channelName = 'notifications';
  private queueName: string;
  private exchangeName: string;
  private channel!: Channel;
  private queue!: Replies.AssertQueue;

  constructor() {
    this.queueName = process.env.AMQP_QUEUE_NAME;
    this.exchangeName = process.env.AMQP_EXCHANGE_NAME;
    this.init();
  }

  private async init() {
    try {
      const connection = await connect('amqp://localhost');
      this.channel = await connection.createChannel();
      await this.channel.assertExchange(this.exchangeName, 'topic', {
        durable: true,
      });
      this.queue = await this.channel.assertQueue(this.queueName, {
        durable: true,
      });
      this.channel.bindQueue(
        this.queue.queue,
        this.exchangeName,
        this.channelName + '.*.*',
      );
    } catch (error) {
      console.error('[notifications.service] -> init', error);
    }
  }
  public async created(notificationTarget: NotificationTarget, message: any) {
    await this.notify(notificationTarget, '.created', message);
  }
  public async updated(notificationTarget: NotificationTarget, message: any) {
    await this.notify(notificationTarget, '.updated', message);
  }
  public async deleted(notificationTarget: NotificationTarget, message: any) {
    await this.notify(notificationTarget, '.deleted', message);
  }
  private async notify(
    target: NotificationTarget,
    topic: string,
    message: any,
  ) {
    this.channel.publish(
      this.exchangeName,
      this.channelName + '.' + topic,
      Buffer.from(
        JSON.stringify({
          target,
          action: topic,
          message,
        }),
      ),
    );
  }
}
