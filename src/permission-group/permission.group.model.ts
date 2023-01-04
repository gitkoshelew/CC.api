import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Permission } from "src/permission/permission.model";
import { ApiProperty } from "@nestjs/swagger";
import { PermissionGroupPermission } from "./permissions.group.model";

interface PermissionGroupCreationAttrs {
  name: string;
}


@Table( {tableName: "PermissionGroup", createdAt: false, updatedAt: false})
export class PermissionGroup extends Model<PermissionGroup, PermissionGroupCreationAttrs> {

  @ApiProperty({example: '1', description: 'uniq id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'stock user group', description: 'uniq name for permission group / required'})
  @Column({type: DataType.STRING, unique: true})
  name: string

  @BelongsToMany(() => Permission, () => PermissionGroupPermission)
  permission: Permission[];
}
