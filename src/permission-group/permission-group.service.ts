import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePermissionGroupDto } from './dto/permission-group.dto';
import { PermissionGroup } from './permission-group.model';

@Injectable()
export class PermissionGroupService {

    constructor(@InjectModel(PermissionGroup) private permissionGroupRepository: typeof PermissionGroup){}

    async createPermissonGroup(dto: CreatePermissionGroupDto) {
        return await this.permissionGroupRepository.create(dto)
    }

}
