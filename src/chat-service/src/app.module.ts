import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatModule } from './chat/chat.module';
import { ChatEntity } from './chat/entities/chat.entity';
import { MemberEntity } from './member/entities/member.entity';
import { MemberModule } from './member/member.module';
import { MessageEntity } from './message/entities/message.entity';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: 'chat',
      autoLoadModels: true,
      models: [ChatEntity, MessageEntity, MemberEntity],
    }),
    ChatModule,
    MessageModule,
    MemberModule,
  ],
})
export class AppModule {}
