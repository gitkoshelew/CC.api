import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import {
  QuestionCreationAttrs,
  QuestionTypes,
  DifficultyTypes,
} from './questions.types';
import { Topic } from '../topic/topic.model';
import { Moderation } from '../moderation/moderation.model';

@Table({ tableName: 'questions' })
export class Question extends Model<Question, QuestionCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.JSON, allowNull: false })
  content: JSON;

  @Column({
    type: DataType.ENUM({ values: Object.values(QuestionTypes) }),
    allowNull: false,
  })
  type: QuestionTypes;

  @Column({
    type: DataType.ENUM({ values: Object.values(DifficultyTypes) }),
    allowNull: false,
  })
  difficulty: DifficultyTypes;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  correctAnswer: string;

  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER })
  topicId: number;

  @BelongsTo(() => Topic)
  topic: Topic;

  @ForeignKey(() => Moderation)
  @Column({ type: DataType.INTEGER })
  moderationId: number;

  @BelongsTo(() => Moderation)
  moderation: Moderation;
}
