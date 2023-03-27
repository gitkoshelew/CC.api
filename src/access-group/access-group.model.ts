import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Permission } from 'src/permission/permission.model';
import { AccessPermission } from './access-permission.model';
import { ApiProperty } from '@nestjs/swagger';
import { UserAccess } from 'src/user/user.access.model';
import { User } from 'src/user/user.model';

interface AccessGroupCreationAttrs {
  name: string;
}

@Table({ tableName: 'access_groups', createdAt: false, updatedAt: false })
export class AccessGroup extends Model<AccessGroup, AccessGroupCreationAttrs> {
  @ApiProperty({ example: '1', description: 'uniq id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'stock user group',
    description: 'uniq name for permission group / required',
  })
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @ApiProperty({
    example: '[admin, user, moderator, tester]',
    description: 'foreign keys for permissions',
  })
  @BelongsToMany(() => Permission, () => AccessPermission)
  permissions: Permission[];

  @BelongsToMany(() => User, () => UserAccess)
  user: User[];
}
