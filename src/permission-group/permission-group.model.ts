import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Permission } from "src/permission/permission.model";

interface PermissionGroupCreationAttrs {
 name: string;
}


@Table( {tableName: "PermissionGroup"})
export class PermissionGroup extends Model<PermissionGroup, PermissionGroupCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      })
    id: number

    @Column({
        type: DataType.STRING,
        unique: true,
      })
    name: string


    @HasMany(()=> Permission) 
    permissions: Permission[]
}