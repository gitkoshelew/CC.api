import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Delete, Put, Query } from '@nestjs/common/decorators';
import { UpdatedAt } from 'sequelize-typescript';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post()
  create(@Body() permissionDto: CreatePermissionDto) {
    return this.permissionService.createPermission(permissionDto);
  }

  @Delete(':id')
  deletePermission(@Param('id') id: number) {
    return this.permissionService.deletePermission(id);
  }

  @Put(':name')
  addPermissionToAccessGroup(@Param('name') name: string) {
    return this.permissionService.addPermissionToAccessGroup(name);
  }

  @Get()
  getAll() {
    return this.permissionService.getAllPermissions();
  }

  @Get(':name')
  getPermissionByName(@Param('name') name: string) {
    return this.permissionService.getPermission(name);
  }
}
