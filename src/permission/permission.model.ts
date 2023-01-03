import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { PermissionGroup } from "src/permission-group/permission-group.model";

interface PermissoinsCreationAttrs {
 name: string;
}


@Table( {tableName: "Permission"})
export class Permission extends Model<Permission, PermissoinsCreationAttrs> {
  @ForeignKey(() => PermissionGroup)
  @Column({type: DataType.INTEGER})
     permissionGroupId: number

     
  @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      })
    id: number

  @Column({
        type: DataType.STRING,
        allowNull: false,
      })
    name: string

  @BelongsTo(() => PermissionGroup)
    permissionGroup: PermissionGroup;
}
