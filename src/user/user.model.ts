import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttrs {
  name: string;
  email: string;
  password: string;
  nickname: string;
}

export enum ModerationStatus {
  change = 'change',
  block = 'block',
  rewrite = 'rewrite',
}

@Table({tableName: 'Users', createdAt: false, updatedAt: false})
export class User extends Model<User, UserCreationAttrs> {

  @ApiProperty({example: '1', description: 'uniq id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'Mary', description: 'required name / not uniq / string'})
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @ApiProperty({example: 'Bogdanova', description: 'not required surname / not uniq / string'})
  @Column({type: DataType.STRING})
  surname: string;

  @ApiProperty({example: 'mary.bogdanova79@gmail.com', description: 'uniq and require email / string'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({example: 'MaryBog', description: 'uniq nickname and required / string'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  nickname: string;

  @ApiProperty({example: 'mary123qwePass', description: 'not uniq / string'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({example: 'change / rewrite', description: 'status for your question on moderation list / enum'})
  @Column({type: DataType.ENUM, values: ['change', 'block', 'rewrite']})
  status: ModerationStatus;

  @ApiProperty({example: 'advanced', description: 'permission group that consist of some permissions not uniq / foreign key'})
  @Column({type: DataType.STRING})
  permission: string;
}
