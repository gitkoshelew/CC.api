import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: '../.env' });
const app = express();
app.use(express.json());

console.log(process.env.NOTIFICATION_SOCKETS_PORT);

app.listen(process.env.NOTIFICATION_SOCKETS_PORT, () => {
  console.log(
    `RMQ-sockets app is running on http://localhost:${process.env.NOTIFICATION_SOCKETS_PORT}`,
  );
});
