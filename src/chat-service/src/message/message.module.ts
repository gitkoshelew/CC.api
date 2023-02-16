import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageModel } from './models/message.model';

@Module({
  imports: [SequelizeModule.forFeature([MessageModel])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
