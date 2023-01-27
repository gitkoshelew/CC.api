import { connect } from 'amqplib';

class SubscriberFactory {
  private channelName = 'notifications';
  private queueName: string;
  private exchangeName: string;
  private listeners: ((message: Buffer) => void)[] = [];

  constructor() {
    this.queueName = process.env.AMQP_QUEUE_NAME ?? 'notifications-q';
    this.exchangeName = process.env.AMQP_EXCHANGE_NAME ?? 'notifications-xch';
    this.init();
  }

  private async init() {
    try {
      const connection = await connect('amqp://localhost');
      const channel = await connection.createChannel();
      await channel.assertExchange(this.exchangeName, 'topic', {
        durable: true,
      });
      const q = await channel.assertQueue(this.queueName, {
        durable: true,
      });
      channel.bindQueue(q.queue, this.exchangeName, this.channelName + '.*');
      channel.consume(q.queue, (msg) => {
        if (msg) {
          console.log(
            '[Subscription -> received a message]',
            msg.content.toString(),
          );
          this.listeners.forEach((listener) => listener(msg.content));
          channel.ack(msg);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  public addListener(listener: (message: Buffer) => void) {
    this.listeners.push(listener);
  }
}

export const Subscription = new SubscriberFactory();
