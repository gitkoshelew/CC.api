import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { AccessGroup } from 'src/access-group/access-group.model';
import { AccessPermission } from 'src/access-group/access-permission.model';

interface PermissoinsCreationAttrs {
  name: string;
}

@Table({ tableName: 'permission' })
export class Permission extends Model<Permission, PermissoinsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => AccessGroup, () => AccessPermission)
  accessGroup: AccessGroup[];
}
