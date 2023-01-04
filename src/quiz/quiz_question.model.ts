import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { Question } from "../question/question.model";
import { Quiz } from "./quiz.model";



@Table({tableName: 'Quiz_Question', createdAt: false, updatedAt: false})
export class Quiz_Question extends Model<Quiz_Question> {

  @ApiProperty({example: '1', description: 'uniq id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() => Quiz)
  @ApiProperty({example: '1', description: 'id for quiz'})
  @Column({type: DataType.INTEGER})
  quizId: number;

  @ForeignKey(() => Question)
  @ApiProperty({example: '1', description: 'id for question'})
  @Column({type: DataType.INTEGER})
  questionId: number;

}
