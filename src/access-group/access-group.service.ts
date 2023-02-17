import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAccessGroupDto } from './dto/access-group.dto';
import { AccessGroup } from './access-group.model';
import { AddPermissionDto } from './dto/addPermissionToAccess.dto';
import { PermissionService } from '../permission/permission.service';
import { CustomErrorHandler } from 'src/utils/custom-error-handler';

@Injectable()
export class AccessGroupService {
  constructor(
    @InjectModel(AccessGroup) private accessGroupRepository: typeof AccessGroup,
    private permissionService: PermissionService,
  ) {}

  async createAccessGroup(dto: CreateAccessGroupDto) {
    try {
      const create = this.accessGroupRepository.create(dto);
      const accessGroup = await create;
      return accessGroup;
    } catch (error) {
      throw CustomErrorHandler.BadRequest('Name is required');
    }
  }

  async deleteAccessGroup(id: number) {
    try {
      const accessGroup = await this.accessGroupRepository.findOne({
        where: { id },
      });
      await accessGroup.destroy();
      return this.accessGroupRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw CustomErrorHandler.BadRequest("Access with this id doen't exist");
    }
  }

  async getAllAccessGroup() {
    try {
      const accessGroups = await this.accessGroupRepository.findAll({
        include: { all: true },
      });
      return accessGroups;
    } catch (error) {
      throw CustomErrorHandler.InternalServerError('Server problems');
    }
  }

  async getAccessGroupById(id: number) {
    try {
      const accessGroup = await this.accessGroupRepository.findOne({
        where: { id },
        include: { all: true },
      });
      return accessGroup;
    } catch (error) {
      throw CustomErrorHandler.BadRequest("Access with this id doen't exist");
    }
  }

  async addPermissionToAccessGroup(dto: AddPermissionDto) {
    try {
      const access = await this.getAccessGroupById(dto.accessId);
      const permission = await this.permissionService.getPermissionById(
        dto.permissionId,
      );
      return access.$add('permission', permission.id);
    } catch (error) {
      throw CustomErrorHandler.BadRequest(
        'Check properties of selected access group or permission',
      );
    }
  }
}
