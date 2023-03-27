import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Question } from '../questions/questions.model';
import { Quiz_Question } from './quiz.question.model';
import { User } from '../user/user.model';
import { Topic } from '../topic/topic.model';

interface QuizCreationAttrs {
  title: string;
}

@Table({ tableName: 'quizzes', createdAt: false, updatedAt: false })
export class Quiz extends Model<Quiz, QuizCreationAttrs> {
  @ApiProperty({ example: 1, description: 'uniq id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'NodeJS',
    description: 'required name / not uniq / string',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example: "I'm a quiz comment",
    description: 'not required name / not uniq / string',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  comment: string;

  @ApiProperty({
    example: '2023-02-19 18:00:16.693018+03',
    description: 'not required name / not uniq / string',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  creationDate: string;

  @ForeignKey(() => User)
  @ApiProperty({ example: 1, description: 'foreign key for author' })
  @Column({ type: DataType.INTEGER })
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @ApiProperty({
    example: 1,
    description: 'number of topic that should be import into question',
  })
  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER })
  topicId: number;

  @BelongsTo(() => Topic)
  topic: Topic;

  @BelongsToMany(() => Question, () => Quiz_Question)
  question: Question[];
}
