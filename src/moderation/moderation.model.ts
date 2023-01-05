import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { Question } from '../question/question.model';

export enum ModerationStatus {
  review = 'review',
  change = 'change',
  block = 'block',
  rewrite = 'rewrite',
  accept = 'accept'
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
  @Column({type: DataType.ENUM, values: ['review', 'change', 'block', 'rewrite', 'accept']})
  status: ModerationStatus;

  @ForeignKey(()=>Question)
  @Column({type: DataType.INTEGER, unique: true, allowNull: false})
  questionId : number

  @BelongsTo(()=> Question)
  question: Question
}
