import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { PermissionService } from "./permission.service";


@Controller('permission')
export class PermissionController {
constructor(private permissionService: PermissionService) {}

    @Post()
    create(@Body() permissionDto: CreatePermissionDto) {
     return this.permissionService.createPermission(permissionDto)
    }


    @Get()
    getAll() {
     return this.permissionService.getAllPermissions()
    }
}
