import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { Quiz } from "../quiz/quiz.model";
import { Quiz_Question } from "../quiz/quiz_question.model";
import { Topic } from "../topic/topic.model";

export enum QuestionType {
  oneChoice = 'oneChoice',
  multiChoice = 'multiChoice'
}

export enum QuestionDifficulty {
  easy = 'easy',
  normal = 'normal',
  hard = 'hard'
}

export enum QuestionTopic {
  CSS = 'CSS',
  React = 'React'
}

interface QuestionCreationAttrs {
  title: string;
  content: JSON;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  description: string;
  topic: QuestionTopic;
}


@Table({tableName: 'Question', createdAt: false, updatedAt: false})
export class Question extends Model<Question, QuestionCreationAttrs> {

  @ApiProperty({example: '1', description: 'uniq id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'NodeJS question #13', description: 'required title / not uniq / string'})
  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @ApiProperty({example: '{"question": "blablabla", "answers": { "wrong" : "bla", "correct" : "blabla"}}', description: 'sample of question at JSON datatype/ required'})
  @Column({type: DataType.JSONB})
  content: JSON;

  @ApiProperty({example: 'oneChoice / multiChoice', description: 'how many of variables can been chosen for answer / required'})
  @Column({type: DataType.ENUM, values: ['oneChoice', 'multiChoice']})
  type: QuestionType;

  @ApiProperty({example: 'easy / normal / hard', description: 'set your difficulty / required'})
  @Column({type: DataType.ENUM,  values: ['easy', 'normal', 'hard']})
  difficulty: QuestionDifficulty;

  @ApiProperty({example: 'this question can find your weakness at EventLoop', description: 'piece of description for the question / required'})
  @Column({type: DataType.STRING})
  description: string;

  @BelongsToMany(() => Quiz, () => Quiz_Question)
  quiz: Quiz[];

  @BelongsTo(()=> Topic)
  @ApiProperty({example: `id": 1, "title": "React`, description: 'topic as in topic model'})
  topic: Topic;

  @ApiProperty({example: '1', description: 'number of topic that should be import into question'})
  @ForeignKey(()=> Topic)
  topicId: number
}
