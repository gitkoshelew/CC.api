import { Module } from '@nestjs/common';
import { PermissionGroupService } from './permission-group.service';
import { PermissionGroupController } from './permission-group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from 'src/permission/permission.model';
import { PermissionGroup } from './permission.group.model';
import { PermissionGroupPermission } from "./permissions.group.model";
import { PermissionModule } from "../permission/permission.module";

@Module({
  providers: [PermissionGroupService],
  controllers: [PermissionGroupController],
  imports: [
    SequelizeModule.forFeature([PermissionGroup, Permission, PermissionGroupPermission]),
    PermissionModule
  ],
  exports: [PermissionGroupService]
})
export class PermissionGroupModule {}
