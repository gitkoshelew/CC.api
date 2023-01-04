import {  Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Question } from "../question/question.model";

interface TopicCreationAttrs {
  title: string;
}

@Table({ tableName: 'Topic', createdAt: false, updatedAt: false})
export class Topic extends Model<Topic, TopicCreationAttrs> {

  @ApiProperty({example: '1', description: 'uniq id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'NodeJS question', description: 'Simple sample for theme / required'})
  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @HasMany(()=> Question)
  question: Question[];
}
