import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Question } from '../questions/questions.model';
import { ApiProperty } from '@nestjs/swagger';
import { Quiz } from 'src/quiz/quiz.model';

export enum ModerationStatus {
  review = 'review',
  change = 'change',
  block = 'block',
  rewrite = 'rewrite',
  accept = 'accept',
}

interface ModerationCreationAttrs {
  comment: string;
  status: ModerationStatus;
}

@Table({ tableName: 'moderations', createdAt: false, updatedAt: false })
export class Moderation extends Model<Moderation, ModerationCreationAttrs> {
  @ApiProperty({ example: 1, description: 'uniq id / number' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Rewrite please some points that were doubt',
    description: 'comment what to do / string',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  comment: string;

  @ApiProperty({
    example: 'rewrite',
    description: 'enum status (review/rewrite/change/block/accept)',
  })
  @Column({
    type: DataType.ENUM,
    values: ['review', 'change', 'block', 'rewrite', 'accept'],
  })
  status: ModerationStatus;

  @HasMany(() => Quiz)
  quiz: Quiz[];
}
