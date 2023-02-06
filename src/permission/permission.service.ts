import { Injectable } from '@nestjs/common';
import { Permission } from './permission.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { CustomErrorHandler } from 'src/utils/custom-error-handler';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission) private permissionRepository: typeof Permission,
  ) {}

  async createPermission(dto: CreatePermissionDto) {
    if (!dto.name) {
      return CustomErrorHandler.BadRequest('Check your DTO');
    }
    return this.permissionRepository.create(dto);
  }

  async deletePermissionById(id: number) {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });

    if (permission) {
      await permission.destroy();
      return await this.permissionRepository.findAll({
        include: { all: true },
      });
    }
  }

  async getPermissionById(id: number) {
    const permission = await this.permissionRepository.findOne({
      where: { id },
      include: { all: true },
    });

    if (permission) {
      return permission;
    }
  }

  async getAllPermissions() {
    const permissionList = await this.permissionRepository.findAll({
      include: { all: true },
    });

    if (permissionList) {
      return permissionList;
    }
  }
}
