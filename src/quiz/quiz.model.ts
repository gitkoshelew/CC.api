import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Question } from '../questions/questions.model';
import { User } from '../user/user.model';
import { Topic } from '../topic/topic.model';
import { Moderation } from 'src/moderation/moderation.model';

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
    description:
      'id of moderation if questions needs of moderation (not enough correct)',
  })
  @ForeignKey(() => Moderation)
  @Column({ type: DataType.INTEGER })
  moderationId: number;

  @BelongsTo(() => Moderation)
  moderation: Moderation;

  @ApiProperty({
    example: 1,
    description: 'number of topic that should be import into question',
  })
  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER })
  topicId: number;

  @HasMany(() => Question)
  questions: Question[];

  @BelongsTo(() => Topic)
  topic: Topic;
}
