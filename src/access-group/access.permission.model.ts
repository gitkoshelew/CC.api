import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from "../permission/permission.model";
import { AccessGroup } from "./access.group.model";


@Table({tableName: 'Group_Permission', createdAt: false, updatedAt: false})
export class AccessGroupPermission extends Model<AccessGroupPermission> {

  @ApiProperty({example: '1', description: 'uniq id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() => Permission)
  @ApiProperty({example: '1', description: 'id for permission'})
  @Column({type: DataType.INTEGER})
  permissionId: number;

  @ForeignKey(() => AccessGroup)
  @ApiProperty({example: '1', description: 'id for permission group'})
  @Column({type: DataType.INTEGER})
  accessGroupId: number;

}
