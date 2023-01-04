import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { PermissionGroup } from "src/permission-group/permission.group.model";
import { ApiProperty } from "@nestjs/swagger";
import { Quiz } from "../quiz/quiz.model";
import { Quiz_Question } from "../quiz/quiz_question.model";
import { PermissionGroupPermission } from "src/permission-group/permissions.group.model";

interface PermissionsCreationAttrs {
  name: string;
}


@Table( {tableName: "Permission", createdAt: false, updatedAt: false})
export class Permission extends Model<Permission, PermissionsCreationAttrs> {

  @ApiProperty({example: '1', description: 'uniq id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'create/update/moderate questions', description: 'permissions to user'})
  @Column({type: DataType.STRING, allowNull: false})
  name: string

  @ForeignKey(() => PermissionGroup)
  @ApiProperty({example: 'stock user group', description: 'uniq permission group that should consist of permissions'})
  permissionGroupId: number

  @BelongsToMany(() => PermissionGroup, () => PermissionGroupPermission)
  permissionGroup: PermissionGroup[];
}
