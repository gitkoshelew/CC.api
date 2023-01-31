import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessageEntity } from './entities/message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [SequelizeModule.forFeature([MessageEntity])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
