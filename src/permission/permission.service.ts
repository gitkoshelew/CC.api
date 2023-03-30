import { Injectable } from '@nestjs/common';
import { Permission } from './permission.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { ErrorHandler } from 'src/utils/error-handler';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission) private permissionRepository: typeof Permission,
  ) {}

  async createPermission(dto: CreatePermissionDto) {
    try {
      return this.permissionRepository.create(dto);
    } catch (error) {
      throw ErrorHandler.BadRequest(error);
    }
  }

  async deletePermissionById(id: number) {
    try {
      const permission = await this.getPermissionById(id);
      await permission.destroy();
      return this.permissionRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.BadRequest("Permission with this id doen't exist");
    }
  }

  async getPermissionById(id: number) {
    try {
      return this.permissionRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.BadRequest("Permission with this id doen't exist");
    }
  }

  async getAllPermissions() {
    try {
      return this.permissionRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.InternalServerError('Server problems');
    }
  }
}
