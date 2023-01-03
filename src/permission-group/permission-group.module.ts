import { Module } from '@nestjs/common';
import { PermissionGroupService } from './permission-group.service';
import { PermissionGroupController } from './permission-group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionGroup } from './permission-group.model';
import { Permission } from 'src/permission/permission.model';

@Module({
  providers: [PermissionGroupService],
  controllers: [PermissionGroupController],
  imports: [SequelizeModule.forFeature([PermissionGroup, Permission])],

})
export class PermissionGroupModule {}
