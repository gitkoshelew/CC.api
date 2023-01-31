import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class MemberEntity extends Model {
  @Column
  user_id: string;

  @Column
  chat_id: string;
}
