import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Question } from '../questions/questions.model';
import { ApiProperty } from "@nestjs/swagger";

interface TopicCreationAttrs {
  title: string;
}

@Table({ tableName: 'topics', createdAt: false, updatedAt: false })
export class Topic extends Model<Topic, TopicCreationAttrs> {

  @ApiProperty({example: '1', description: 'uniq id'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example: 'NodeJS question', description: 'Simple sample for title of topic / required'})
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @HasMany(() => Question)
  questions: Question[];
}
