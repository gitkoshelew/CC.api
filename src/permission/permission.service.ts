import { Injectable } from "@nestjs/common";
import { Permission } from "./permission.model";
import { InjectModel } from '@nestjs/sequelize';
import { CreatePermissionDto } from "./dto/create-permission.dto";


@Injectable()
export class PermissionService {

  constructor(@InjectModel(Permission) private permissionRepository: typeof Permission){}

  async createPermission(dto: CreatePermissionDto) {
    const newPermission = await this.permissionRepository.create(dto)
    return newPermission
  }

  async getAllPermissions(){
    const allPermissions = await this.permissionRepository.findAll({include: { all : true }})
    return allPermissions;
  }

  async getPermissionById(id: number){
    const permission = await this.permissionRepository.findOne({where: {id}, include: {all: true}});
    return permission;
  }
}
