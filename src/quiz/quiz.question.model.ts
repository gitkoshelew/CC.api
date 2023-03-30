import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Quiz } from './quiz.model';
import { Question } from '../questions/questions.model';

// <Remark>
// Is Quiz_Question is proper name for the class
// It should be named QuizQuestion
@Table({ tableName: 'quiz_questions', createdAt: false, updatedAt: false })
export class Quiz_Question extends Model<Quiz_Question> {
  @ApiProperty({ example: '1', description: 'uniq id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Quiz)
  @ApiProperty({ example: '1', description: 'id for quiz' })
  @Column({ type: DataType.INTEGER })
  quizId: number;

  @ForeignKey(() => Question)
  @ApiProperty({ example: '1', description: 'id for question' })
  @Column({ type: DataType.INTEGER })
  questionId: number;
}
