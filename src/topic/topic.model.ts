import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Quiz } from '../quiz/quiz.model';

interface TopicCreationAttrs {
  title: string;
}

@Table({ tableName: 'topics', createdAt: false, updatedAt: false })
export class Topic extends Model<Topic, TopicCreationAttrs> {
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
    description: 'Simple sample for title of topic / required',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  title: string;

  @HasMany(() => Quiz)
  quizzes: Quiz[];
}
