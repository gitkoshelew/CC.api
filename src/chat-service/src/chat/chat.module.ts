import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatEntity } from './entities/chat.entity';

@Module({
  imports: [SequelizeModule.forFeature([ChatEntity])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
