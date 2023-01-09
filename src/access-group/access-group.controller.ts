import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateAccessGroupDto } from './dto/access-group.dto';
import { AccessGroupService } from './access-group.service';

@Controller('access-group')
export class AccessGroupController {
  constructor(private accessGroupService: AccessGroupService) {}

  @Post()
  create(@Body() accessGroupDto: CreateAccessGroupDto) {
    return this.accessGroupService.createAccessGroup(accessGroupDto);
  }

  @Get()
  getAll() {
    return this.accessGroupService.getAllAccessGroup();
  }

  @Get(':name')
  getByName(@Param('name') name: string) {
    return this.accessGroupService.getAccessGroup(name);
  }

  @Delete(':id')
  deletePermission(@Param('id') id: number) {
    return this.accessGroupService.deleteAccessGroup(id);
  }
}
