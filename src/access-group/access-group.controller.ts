import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateAccessGroupDto } from './dto/access-group.dto';
import { AccessGroupService } from './access-group.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessGroup } from './access-group.model';
import { Put } from '@nestjs/common/decorators';
import { AddPermissionDto } from './dto/addPermissionToAccess.dto';

@ApiTags('Access group')
@Controller('api/access')
export class AccessGroupController {
  constructor(private accessGroupService: AccessGroupService) {}

  @ApiOperation({ summary: 'create access group' })
  @ApiResponse({ status: 201, type: AccessGroup })
  @Post()
  async create(@Body() accessGroupDto: CreateAccessGroupDto) {
    return this.accessGroupService.createAccessGroup(accessGroupDto);
  }

  @ApiOperation({ summary: 'view all accesses group' })
  @ApiResponse({ status: 200, type: [AccessGroup] })
  @Get()
  async getAll() {
    return this.accessGroupService.getAllAccessGroup();
  }

  @ApiOperation({ summary: 'view one accesses group by filter of id' })
  @ApiResponse({ status: 200, type: AccessGroup })
  @ApiResponse({ status: 404, description: 'not found access with that id' })
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.accessGroupService.getAccessGroupById(id);
  }

  @ApiOperation({ summary: 'delete accesses group by id' })
  @ApiResponse({ status: 200, type: AccessGroup })
  @Delete(':id')
  async deletePermission(@Param('id') id: number) {
    return this.accessGroupService.deleteAccessGroup(id);
  }

  @ApiOperation({ summary: 'add permission to access group' })
  @ApiResponse({ status: 200, type: AccessGroup })
  @Put('/add')
  async addPermissionToAccessGroup(@Body() dto: AddPermissionDto) {
    return this.accessGroupService.addPermissionToAccessGroup(dto);
  }
}
