import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { PermissionService } from "./permission.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Permission } from "./permission.model";


@ApiTags('Permission')
@Controller('api/permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @ApiOperation({summary: 'create permission'})
  @ApiResponse({status: 201, type: Permission})
  @Post()
  create(@Body() permissionDto: CreatePermissionDto) {
    return this.permissionService.createPermission(permissionDto)
  }

  @ApiOperation({summary: 'vue all permissions'})
  @ApiResponse({status: 200, type: [Permission]})
  @Get()
  getAll() {
    return this.permissionService.getAllPermissions()
  }

  @ApiOperation({summary: 'Method to get one permission'})
  @ApiResponse({status: 200, type: [Permission]})
  @Get('/:id')
  getQuestionById(@Param('id') id: number) {
    return this.permissionService.getPermissionById(id)
  }
}
