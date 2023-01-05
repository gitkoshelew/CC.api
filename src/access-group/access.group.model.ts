import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Permission } from "src/permission/permission.model";
import { ApiProperty } from "@nestjs/swagger";
import { AccessGroupPermission } from "./access.permission.model";

interface AccessGroupCreationAttrs {
  name: string;
}


@Table( {tableName: "AccessGroup", createdAt: false, updatedAt: false})
export class AccessGroup extends Model<AccessGroup, AccessGroupCreationAttrs> {

  @ApiProperty({example: '1', description: 'uniq id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'stock user group', description: 'uniq name for permission group / required'})
  @Column({type: DataType.STRING, unique: true})
  name: string

  @BelongsToMany(() => Permission, () => AccessGroupPermission)
  permission: Permission[];
}
