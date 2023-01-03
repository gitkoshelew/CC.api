import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum ModerationStatus {
  change = 'change',
  block = 'block',
  rewrite = 'rewrite',
}

interface ModerationCreationAttrs {
  comment: string;
  status: ModerationStatus;
}

@Table({ tableName: 'Moderation' })
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
}
