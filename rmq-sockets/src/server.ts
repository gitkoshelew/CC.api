import { Subscription } from './subscriber';
import * as dotenv from 'dotenv';
import { Server } from 'socket.io';

dotenv.config({ path: '../.production.env' });

const PORT = Number(process.env.NOTIFICATION_SOCKETS_PORT);
const io = new Server();
io.listen(Number(PORT));

const messagesList: Buffer[] = [];
Subscription.addListener((message: Buffer) => {
  if (messagesList.length > 9) {
    messagesList.shift();
  }
  messagesList.push(message);
});

io.on('connection', (socket) => {
  console.log(`[sockets] -> connected ${socket.id}`);

  Subscription.addListener((message: Buffer) => {
    console.log('[rmq-sockets] -> message', message.toString());
    socket.emit('notification', message.toString());
  });

  socket.on('get-notifications', () => {
    socket.emit(
      'get-notifications',
      messagesList.map((message) => message.toString()),
    );
  });

  socket.on('disconnect', () => {
    console.log(`[sockets] -> disconnected ${socket.id}`);
  });
});

console.log(`RMQ-sockets are running on http://localhost:${PORT}`);
