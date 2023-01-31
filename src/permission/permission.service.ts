import { Injectable } from '@nestjs/common';
import { Permission } from './permission.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { CustomErrorHandler } from 'src/utils/custom-error-handler';
import { HttpErrorTypes } from 'src/utils/error.types';
import e from 'express';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission) private permissionRepository: typeof Permission,
  ) {}

  async createPermission(dto: CreatePermissionDto) {
    if (dto.name) {
      return await this.permissionRepository.create(dto);
    } else
      throw new CustomErrorHandler(
        'Check your DTO',
        HttpErrorTypes.BAD_REQUEST,
      );
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
    } else
      throw new CustomErrorHandler(
        "This Id doesn't exist",
        HttpErrorTypes.NOT_FOUND,
      );
  }

  async getPermissionById(id: number) {
    const permission = await this.permissionRepository.findOne({
      where: { id },
      include: { all: true },
    });

    if (permission) {
      return permission;
    } else
      throw new CustomErrorHandler(
        "This Id doesn't exist",
        HttpErrorTypes.NOT_FOUND,
      );
  }

  async getAllPermissions() {
    const permissionList = await this.permissionRepository.findAll({
      include: { all: true },
    });

    if (permissionList) {
      return permissionList;
    } else
      throw new CustomErrorHandler(
        'Server Error',
        HttpErrorTypes.INTERNAL_SERVER_ERROR,
      );
  }
}
