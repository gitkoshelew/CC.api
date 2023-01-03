import { Injectable } from "@nestjs/common";
import { Permission } from "./permission.model";
import { InjectModel } from '@nestjs/sequelize';
import { CreatePermissionDto } from "./dto/create-permission.dto";


@Injectable()
export class PermissionService {

    constructor(@InjectModel(Permission) private permissionRepository: typeof Permission){}
    
    async createPermission(dto: CreatePermissionDto) {
        return await this.permissionRepository.create(dto)
    }

    async getAllPermissions(){
        return await this.permissionRepository.findAll()

    }
}