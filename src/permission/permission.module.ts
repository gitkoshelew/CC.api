import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionGroup } from 'src/permission-group/permission-group.model';
import { PermissionController } from './permission.controller';
import { Permission } from './permission.model';
import { PermissionService } from './permission.service';

@Module({
    controllers: [PermissionController],
    providers: [PermissionService],
    imports: [SequelizeModule.forFeature([Permission, PermissionGroup])],
})
export class PermissionModule {}
