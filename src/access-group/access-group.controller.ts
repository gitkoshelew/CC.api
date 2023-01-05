import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateAccessGroupDto } from './dto/create-accessgroup.dto';
import { AccessGroupService } from './access-group.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AccessGroup } from './access.group.model';
import { AddPermissionDto } from "./dto/add-permission.dto";

@ApiTags('Access group')
@Controller('api/access')
export class AccessGroupController {

  constructor(private accessGroupService: AccessGroupService){}

  @ApiOperation({summary: 'create access group'})
  @ApiResponse({status: 201, type: AccessGroup})
  @Post()
  create(@Body() accessGroupDto: CreateAccessGroupDto) {
    return this.accessGroupService.createAccessGroup(accessGroupDto)
  }

  @ApiOperation({summary: 'view all accesses group'})
  @ApiResponse({status: 200, type: [AccessGroup]})
  @Get()
  getAll() {
    return this.accessGroupService.getAllAccess()
  }

  @ApiOperation({summary: 'add permission group'})
  @ApiResponse({status: 200, type: AccessGroup})
  @Post('/add')
  addPermissionToAccessGroup(@Body() dto: AddPermissionDto) {
    return this.accessGroupService.addPermissionToAccessGroup(dto)
  }
}
