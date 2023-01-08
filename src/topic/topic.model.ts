import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Question } from '../questions/questions.model';

interface TopicCreationAttrs {
  title: string;
}

@Table({ tableName: 'topics' })
export class Topic extends Model<Topic, TopicCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @HasMany(() => Question)
  questions: Question[];
}
