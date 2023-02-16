import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatModule } from './chat/chat.module';
import { getSequilizeConfig } from './configs/sequalize.config';
import { MemberModule } from './member/member.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync(getSequilizeConfig()),
    ChatModule,
    MessageModule,
    MemberModule,
  ],
})
export class AppModule {}
