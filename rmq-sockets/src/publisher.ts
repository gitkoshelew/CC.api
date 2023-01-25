import { connect } from 'amqplib';

const main = async () => {
  try {
    const connection = await connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange('notifications-xch', 'topic', {
      durable: true,
    });
    const replyQueue = await channel.assertQueue('', { exclusive: true });
    const q = await channel.assertQueue('notifications-q', { durable: true });
    channel.bindQueue(q.queue, 'notifications-xch', 'notifications.*');
    channel.consume(replyQueue.queue, (msg) => {
      if (msg) {
        console.log(msg.content.toString());
        channel.ack(msg);
      }
    });
    channel.publish(
      'notifications-xch',
      'notifications.info',
      Buffer.from('Hello World!'),
      {
        replyTo: replyQueue.queue,
        correlationId: '1',
      },
    );
  } catch (error) {
    console.log(error);
  }
};

main();
