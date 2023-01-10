import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { AccessGroup } from "src/access-group/access.group.model";
import { ApiProperty } from "@nestjs/swagger";
import { AccessGroupPermission } from "src/access-group/access.permission.model";

interface PermissionsCreationAttrs {
  name: string;
}


@Table( {tableName: "permissions", createdAt: false, updatedAt: false})
export class Permission extends Model<Permission, PermissionsCreationAttrs> {

  @ApiProperty({example: '1', description: 'uniq id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'create/update/moderate questions', description: 'permissions to user'})
  @Column({type: DataType.STRING, allowNull: false})
  name: string

  @BelongsToMany(() => AccessGroup, () => AccessGroupPermission)
  accessGroup: AccessGroup[];
}
