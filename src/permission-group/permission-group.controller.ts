import { Body, Controller, Post } from '@nestjs/common';
import { CreatePermissionGroupDto } from './dto/permission-group.dto';
import { PermissionGroupService } from './permission-group.service';

@Controller('permission-group')
export class PermissionGroupController {

constructor(private permissionGroupService: PermissionGroupService){}
    @Post()
    create(@Body() permissionGroupDto: CreatePermissionGroupDto) {
        return this.permissionGroupService.createPermissonGroup(permissionGroupDto)
    }
}
