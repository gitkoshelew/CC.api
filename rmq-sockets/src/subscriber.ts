import { connect } from 'amqplib';

const run = async () => {
  try {
    const connection = await connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange('notifications-xch', 'topic', {
      durable: true,
    });
    const q = await channel.assertQueue('notifications-q', {
      durable: true,
    });
    channel.bindQueue(q.queue, 'notifications-xch', 'notifications.*');
    channel.consume(q.queue, (msg) => {
      if (msg) {
        console.log(msg.content.toString());
        channel.ack(msg);

        if (msg.properties.replyTo) {
          channel.sendToQueue(msg.properties.replyTo, Buffer.from('Reply!'), {
            correlationId: msg.properties.correlationId,
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

run();
