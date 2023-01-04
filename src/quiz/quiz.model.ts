import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { Question } from "../question/question.model";
import { Quiz_Question } from "./quiz_question.model";

interface QuizCreationAttrs {
  title: string;
  author: string;
}


@Table({tableName: 'Quiz'})
export class Quiz extends Model<Quiz, QuizCreationAttrs> {

  @ApiProperty({example: '1', description: 'uniq id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'NodeJS', description: 'required name / not uniq / string'})
  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @ApiProperty({example: '{id: 1, name: Mary, nickname: GodFather}', description: 'foreign key'})
  @Column({type: DataType.STRING})
  author: string;

  @BelongsToMany(() => Question, () => Quiz_Question)
  question: Question[];

  // @ApiProperty({example: '2023-01-03 14:35:27.107+03', description: 'required dataTime / autogenerate / not uniq / string'})
  // @Column({type: DataType.TIME})
  // createdAt: string;
  //
  // @ApiProperty({example: '2023-01-03 14:35:27.107+03', description: 'required dataTime / autogenerate / not uniq / string'})
  // @Column({type: DataType.TIME})
  // updatedAt: string;
}
