import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionService } from './permission.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permission } from './permission.model';
import { CustomErrorHandler } from 'src/utils/custom-error-handler';
import { HttpErrorTypes } from 'src/utils/error.types';

@ApiTags('Permission')
@Controller('api/permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @ApiOperation({ summary: 'create permission' })
  @ApiResponse({ status: 201, type: Permission })
  @Post()
  create(@Body() permissionDto: CreatePermissionDto) {
    return this.permissionService.createPermission(permissionDto);
  }

  @ApiOperation({ summary: 'delete permission' })
  @ApiResponse({ status: 200, type: Permission })
  @Delete(':id')
  deletePermission(@Param('id') id: number) {
    return this.permissionService.deletePermissionById(id);
  }

  @ApiOperation({ summary: 'vue all permissions' })
  @ApiResponse({ status: 200, type: [Permission] })
  @Get()
  getAll() {
    return this.permissionService.getAllPermissions();
  }

  @ApiOperation({ summary: 'Method to get one permission by id' })
  @ApiResponse({ status: 200, type: [Permission] })
  @Get(':id')
  getPermissionById(@Param('id') id: number) {
    return this.permissionService.getPermissionById(id);
  }
}
