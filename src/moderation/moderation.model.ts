import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Question } from '../questions/questions.model';

export enum ModerationStatus {
  change = 'change',
  block = 'block',
  rewrite = 'rewrite',
}

interface ModerationCreationAttrs {
  comment: string;
  status: ModerationStatus;
}

@Table({ tableName: 'moderations' })
export class Moderation extends Model<Moderation, ModerationCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;

  @Column({
    type: DataType.ENUM,
    values: ['change', 'block', 'rewrite'],
  })
  status: ModerationStatus;

  @HasOne(() => Question)
  question: Question;
}
