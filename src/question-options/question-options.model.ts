import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Question } from '../questions/questions.model';

interface QuestionOptionsAttrs {
  name: string;
}

@Table({ tableName: 'question_options', createdAt: true, updatedAt: true })
export class QuestionOptions extends Model<
  QuestionOptions,
  QuestionOptionsAttrs
> {
  @ApiProperty({ example: 1, description: 'uniq id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'option',
    description: 'your option',
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
