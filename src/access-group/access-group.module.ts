import { Module } from '@nestjs/common';
import { AccessGroupService } from './access-group.service';
import { AccessGroupController } from './access-group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from 'src/permission/permission.model';
import { AccessPermission } from './access-permission.model';
import { AccessGroup } from './access-group.model';

@Module({
  providers: [AccessGroupService],
  controllers: [AccessGroupController],
  imports: [
    SequelizeModule.forFeature([AccessGroup, Permission, AccessPermission]),
  ],
  exports: [AccessGroupService],
})
export class AccessGroupModule {}
