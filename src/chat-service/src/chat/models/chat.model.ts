import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class ChatModel extends Model {
  @Column
  creator_id: string;

  @Column
  name: string;
}
