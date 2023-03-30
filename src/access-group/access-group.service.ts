import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAccessGroupDto } from './dto/access-group.dto';
import { AccessGroup } from './access-group.model';
import { AddPermissionDto } from './dto/addPermissionToAccess.dto';
import { PermissionService } from '../permission/permission.service';
import { ErrorHandler } from 'src/utils/error-handler';

@Injectable()
export class AccessGroupService {
  constructor(
    @InjectModel(AccessGroup) private accessGroupRepository: typeof AccessGroup,
    private permissionService: PermissionService,
  ) {}

  async createAccessGroup(dto: CreateAccessGroupDto) {
    try {
      return this.accessGroupRepository.create(dto);
    } catch (error) {
      throw ErrorHandler.BadRequest('Name is required');
    }
  }

  async deleteAccessGroup(id: number) {
    try {
      const accessGroup = await this.getAccessGroupById(id);
      await accessGroup.destroy();
      return this.accessGroupRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.BadRequest("Access with this id doen't exist");
    }
  }

  async getAllAccessGroup() {
    try {
      return this.accessGroupRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.InternalServerError('Server problems');
    }
  }

  async getAccessGroupById(id: number) {
    try {
      return this.accessGroupRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw ErrorHandler.BadRequest("Access with this id doen't exist");
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
      throw ErrorHandler.BadRequest(
        'Check properties of selected access group or permission',
      );
    }
  }
}
