import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Question } from './questions.model';

interface OptionsAttrs {
  name: string;
}

@Table({ tableName: 'options', createdAt: true, updatedAt: true })
export class Options extends Model<Options, OptionsAttrs> {
  @ApiProperty({ example: 1, description: 'uniq id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'options 1',
    description: 'your options',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ForeignKey(() => Question)
  @ApiProperty({ example: 1, description: 'foreign key for author' })
  @Column({ type: DataType.INTEGER })
  questionId: number;

  @BelongsTo(() => Question)
  question: Question;
}
