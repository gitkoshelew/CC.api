import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import {
  QuestionCreationAttrs,
  QuestionTypes,
  DifficultyTypes,
} from './questions.types';
import { Topic } from '../topic/topic.model';
import { Moderation } from '../moderation/moderation.model';
import { ApiProperty } from '@nestjs/swagger';
import { Quiz } from '../quiz/quiz.model';
import { Quiz_Question } from '../quiz/quiz.question.model';
import { CorrectAnswers } from '../correct-answer/correct-answer.model';
import { QuestionOptions } from 'src/question-options/question-options.model';

@Table({ tableName: 'questions', createdAt: false, updatedAt: false })
export class Question extends Model<Question, QuestionCreationAttrs> {
  @ApiProperty({ example: 1, description: 'uniq id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'NodeJS question #13',
    description: 'required title / not uniq / string',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'single / multi',
    description: 'how many of variables can been chosen for answer / required',
  })
  @Column({
    type: DataType.ENUM({ values: Object.values(QuestionTypes) }),
    allowNull: false,
  })
  type: QuestionTypes;

  @ApiProperty({
    example: 'light / medium / hard',
    description: 'set your difficulty / required',
  })
  @Column({
    type: DataType.ENUM({ values: Object.values(DifficultyTypes) }),
    allowNull: false,
  })
  difficulty: DifficultyTypes;

  @ApiProperty({
    example: 'that test will show us ur power in Node js',
    description: 'make it by ur own / required',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({
    example: 600,
    description: 'Time to resolve the question in seconds / required',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  timer: number;

  @ApiProperty({
    example: 1,
    description: 'number of topic that should be import into question',
  })
  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER })
  topicId: number;

  @BelongsTo(() => Topic)
  topic: Topic;

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

  @BelongsToMany(() => Quiz, () => Quiz_Question)
  quiz: Quiz[];

  @HasMany(() => CorrectAnswers)
  correctAnswers: CorrectAnswers[];

  @HasMany(() => QuestionOptions)
  options: QuestionOptions[];
}
