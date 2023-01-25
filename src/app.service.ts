import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class AppService {
  constructor(private rmqService: RMQService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
