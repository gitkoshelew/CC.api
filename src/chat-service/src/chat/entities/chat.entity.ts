import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class ChatEntity extends Model {
  @Column
  creator_id: string;

  @Column
  name: string;
}
