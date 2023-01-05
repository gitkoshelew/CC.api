import { Module } from '@nestjs/common';
import { AccessGroupService } from './access-group.service';
import { AccessGroupController } from './access-group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from 'src/permission/permission.model';
import { AccessGroup } from './access.group.model';
import { AccessGroupPermission } from "./access.permission.model";
import { PermissionModule } from "../permission/permission.module";

@Module({
  providers: [AccessGroupService],
  controllers: [AccessGroupController],
  imports: [
    SequelizeModule.forFeature([AccessGroup, Permission, AccessGroupPermission]),
    PermissionModule
  ],
  exports: [AccessGroupService]
})
export class AccessGroupModule {}
