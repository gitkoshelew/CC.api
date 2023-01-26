import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Permission } from 'src/permission/permission.model';
import { AccessGroup } from './access-group.model';

@Table({ tableName: 'access_permission', createdAt: false, updatedAt: false })
export class AccessPermission extends Model<AccessPermission> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Permission)
  @Column({ type: DataType.INTEGER })
  permissionId: number;

  @ForeignKey(() => AccessGroup)
  @Column({ type: DataType.INTEGER })
  accessGroupId: number;
}
