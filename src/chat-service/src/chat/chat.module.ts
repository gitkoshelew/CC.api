import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatModel } from './models/chat.model';

@Module({
  imports: [SequelizeModule.forFeature([ChatModel])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
