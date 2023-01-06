import { Injectable } from '@nestjs/common';
import { Permission } from './permission.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { AccessGroupService } from 'src/access-group/access-group.service';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission) private permissionRepository: typeof Permission,
    private accessGroupService: AccessGroupService,
  ) {}

  async createPermission(dto: CreatePermissionDto) {
    return await this.permissionRepository.create(dto);
  }

  async deletePermission(id: number) {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });

    await permission.destroy();

    return await this.permissionRepository.findAll({ include: { all: true } });
  }

  async getAllPermissions() {
    return await this.permissionRepository.findAll({ include: { all: true } });
  }

  async addPermissionToAccessGroup(name: string) {
    const permission = await this.permissionRepository.findOne({
      where: { name },
    });
    const group = await this.accessGroupService.getAccessGroup('admins');
    await permission.$set('accessGroup', [group.id]);
    return permission;
  }
}
