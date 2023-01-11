import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Permission } from 'src/permission/permission.model';
import { AccessPermission } from './access-permission.model';

interface AccessGroupCreationAttrs {
  name: string;
}

@Table({ tableName: 'access_group' })
export class AccessGroup extends Model<AccessGroup, AccessGroupCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;

  @BelongsToMany(() => Permission, () => AccessPermission)
  permissions: Permission[];
}
