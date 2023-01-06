import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccessGroup } from 'src/access-group/access-group.model';
import { AccessGroupModule } from 'src/access-group/access-group.module';
import { AccessPermission } from 'src/access-group/access-permission.model';
import { PermissionController } from './permission.controller';
import { Permission } from './permission.model';
import { PermissionService } from './permission.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  imports: [
    SequelizeModule.forFeature([Permission, AccessGroup, AccessPermission]),
    AccessGroupModule,
  ],
})
export class PermissionModule {}
