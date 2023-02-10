import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAccessGroupDto } from './dto/access-group.dto';
import { AccessGroup } from './access-group.model';
import { AddPermissionDto } from './dto/addPermissionToAccess.dto';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class AccessGroupService {
  constructor(
    @InjectModel(AccessGroup) private accessGroupRepository: typeof AccessGroup,
    private permissionRepository: PermissionService,
  ) {}

  async createAccessGroup(dto: CreateAccessGroupDto) {
    return await this.accessGroupRepository.create(dto);
  }

  async deleteAccessGroup(id: number) {
    const permission = await this.accessGroupRepository.findOne({
      where: { id },
    });
    await permission.destroy();
    return await this.accessGroupRepository.findAll({ include: { all: true } });
  }

  async getAllAccessGroup() {
    return await this.accessGroupRepository.findAll({ include: { all: true } });
  }

  async getAccessGroupById(id: number) {
    return await this.accessGroupRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async addPermissionToAccessGroup(dto: AddPermissionDto) {
    const access = await this.accessGroupRepository.findByPk(dto.accessId);
    const permission = await this.permissionRepository.getPermissionById(
      dto.permissionId,
    );
    // if (permission && access) {
    //   return await access.$add('permission', permission.id);
    // }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }
}
