import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAccessGroupDto } from './dto/access-group.dto';
import { AccessGroup } from './access-group.model';

@Injectable()
export class AccessGroupService {
  constructor(
    @InjectModel(AccessGroup)
    private accessGroupRepository: typeof AccessGroup,
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

  async getAllAccessGroup(){
    return await this.accessGroupRepository.findAll()
  }

  async getAccessGroup(name: string) {
    return await this.accessGroupRepository.findOne({
      where: { name },
      include: { all: true },
    });
  }
}
