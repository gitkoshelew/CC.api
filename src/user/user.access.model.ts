import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { AccessGroup } from '../access-group/access-group.model';

@Table({ tableName: 'user_accesses', createdAt: false, updatedAt: false })
export class UserAccess extends Model<UserAccess> {
  @ApiProperty({ example: '1', description: 'uniq id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @ApiProperty({ example: '1', description: 'id for user' })
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => AccessGroup)
  @ApiProperty({ example: '1', description: 'id for permission group' })
  @Column({ type: DataType.INTEGER })
  accessGroupId: number;
}
