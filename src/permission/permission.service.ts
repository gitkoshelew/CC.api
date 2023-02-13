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
    try {
      const create = this.permissionRepository.create(dto);
      const permission = await create;
      return permission;
    } catch (error) {
      throw CustomErrorHandler.BadRequest(error.errors[0].message);
    }
  }

  async deletePermissionById(id: number) {
    try {
      const permission = await this.permissionRepository.findOne({
        where: { id },
      });
      await permission.destroy();
      return await this.permissionRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw CustomErrorHandler.BadRequest("Id doen't exist");
    }
  }

  async getPermissionById(id: number) {
    const permission = await this.permissionRepository.findOne({
      where: { id },
      include: { all: true },
    });

    if (!permission) {
      throw CustomErrorHandler.BadRequest("Id doen't exist");
    }
    return permission;
  }

  async getAllPermissions() {
    const permissionList = await this.permissionRepository.findAll({
      include: { all: true },
    });

    if (!permissionList) {
      throw CustomErrorHandler.InternalServerError('Server problems');
    }
    return permissionList;
  }
}
