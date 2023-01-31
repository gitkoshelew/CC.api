export class Message {}

import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class MessageEntity extends Model {
  @Column
  chat_id: string;

  @Column
  fromUser_id: string;

  @Column
  text: string;
}
