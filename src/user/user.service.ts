import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { AddAccessDto } from './dto/addAccessToUser.dto';
import { AccessGroupService } from 'src/access-group/access-group.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private accessRepository: AccessGroupService,
  ) {}

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async addAccessToUser(dto: AddAccessDto) {
    const access = await this.accessRepository.getAccessGroupById(
      dto.accessGroupId,
    );
    const user = await this.getUserById(dto.userId);
    if (access && user) {
      return await user.$add('access', access.id);
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }
}
