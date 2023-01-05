import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAccessGroupDto } from './dto/create-accessgroup.dto';
import { AccessGroup } from './access.group.model';
import { PermissionService } from "../permission/permission.service";
import { AddPermissionDto } from './dto/add-permission.dto';

@Injectable()
export class AccessGroupService {

  constructor(@InjectModel(AccessGroup) private accessGroupRepository: typeof AccessGroup,
                                      private permissionService: PermissionService){}

  async createAccessGroup(dto: CreateAccessGroupDto) {
    const access = await this.accessGroupRepository.create(dto)
    return access
  }

  async getAllAccess() {
    const accesses = await this.accessGroupRepository.findAll()
    return accesses
  }

  async addPermissionToAccessGroup(dto: AddPermissionDto) {
    const access = await this.accessGroupRepository.findByPk(dto.accessId)
    const permission = await this.permissionService.getPermissionById(dto.permissionId)
    if (access && permission) {
      return await access.$add('permission', permission.id);
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }
}
