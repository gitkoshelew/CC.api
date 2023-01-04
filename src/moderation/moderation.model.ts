import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from "@nestjs/swagger";

export enum ModerationStatus {
  change = 'change',
  block = 'block',
  rewrite = 'rewrite',
  done = 'done'
}

interface ModerationCreationAttrs {
  comment: string;
  status: ModerationStatus;
}

@Table({ tableName: 'Moderation', createdAt: false, updatedAt: false})
export class Moderation extends Model<Moderation, ModerationCreationAttrs> {

  @ApiProperty({example: '1', description: 'uniq id / number'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'Rewrite please some points that were doubt', description: 'comment what to do / string'})
  @Column({type: DataType.STRING, allowNull: false})
  comment: string;

  @ApiProperty({example: 'rewrite', description: 'enum status (rewrite/change/block/done)'})
  @Column({type: DataType.ENUM, values: ['change', 'block', 'rewrite', 'done']})
  status: ModerationStatus;
}
