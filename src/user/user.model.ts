import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserAccess } from './user.access.model';
import { Quiz } from '../quiz/quiz.model';
import { AccessGroup } from '../access-group/access-group.model';

interface UserCreationAttrs {
  name: string;
  email: string;
  password: string;
  nickname: string;
}

export enum ModerationStatus {
  banned = 'banned',
  free = 'free',
}

@Table({ tableName: 'users', createdAt: false, updatedAt: false })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'uniq id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Mary',
    description: 'required name / not uniq / string',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'Bogdanova',
    description: 'not required surname / not uniq / string',
  })
  @Column({ type: DataType.STRING })
  surname: string;

  @ApiProperty({
    example: 'mary.bogdanova79@gmail.com',
    description: 'uniq and require email / string',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({
    example: 'MaryBog',
    description: 'uniq nickname and required / string',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  nickname: string;

  @ApiProperty({ example: 'mary123qwePass', description: 'not uniq / string' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: 'change / rewrite',
    description: 'status for your question on moderation list / enum',
  })
  @Column({ type: DataType.ENUM, values: ['banned', 'free'] })
  status: ModerationStatus;

  @BelongsToMany(() => AccessGroup, () => UserAccess)
  access: AccessGroup[];

  @HasMany(() => Quiz)
  quiz: Quiz[];
}
