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

interface CorrectAnswersAttrs {
  name: string;
}

@Table({ tableName: 'correct_answers', createdAt: true, updatedAt: true })
export class CorrectAnswers extends Model<CorrectAnswers, CorrectAnswersAttrs> {
  @ApiProperty({ example: 1, description: 'uniq id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'answer 1',
    description: 'your correct answer',
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
