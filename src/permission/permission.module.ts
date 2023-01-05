import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccessGroup } from 'src/access-group/access.group.model';
import { PermissionController } from './permission.controller';
import { Permission } from './permission.model';
import { PermissionService } from './permission.service';
import { AccessGroupPermission } from "../access-group/access.permission.model";

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  imports: [SequelizeModule.forFeature([Permission, AccessGroup, AccessGroupPermission])],
  exports: [PermissionService]
})
export class PermissionModule {}
