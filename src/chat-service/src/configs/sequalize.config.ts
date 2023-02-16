import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { ChatModel } from '../chat/models/chat.model';
import { MemberModel } from '../member/models/member.model';
import { MessageModel } from '../message/models/message.model';

export const getSequilizeConfig = (): SequelizeModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): SequelizeModuleOptions => {
    return {
      dialect: 'postgres',
      host: configService.get('POSTGRES_HOST'),
      port: configService.get('POSTGRES_PORT'),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DB'),
      autoLoadModels: true,
      models: [ChatModel, MessageModel, MemberModel],
    };
  },
});
