import { Body, Controller, Post } from '@nestjs/common';
import { CreatePermissionGroupDto } from './dto/create-pergroup.dto';
import { PermissionGroupService } from './permission-group.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PermissionGroup } from './permission.group.model';

@ApiTags('Permission group')
@Controller('api/permission-group')
export class PermissionGroupController {

  constructor(private permissionGroupService: PermissionGroupService){}

  @ApiOperation({summary: 'create permission group'})
  @ApiResponse({status: 201, type: PermissionGroup})
  @Post()
  create(@Body() permissionGroupDto: CreatePermissionGroupDto) {
    return this.permissionGroupService.createPermissionGroup(permissionGroupDto)
  }
}
