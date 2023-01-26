import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { AddAccessDto } from './dto/addAccessToUser.dto';
import { AccessGroupService } from 'src/access-group/access-group.service';
import { AccessGroup } from '../access-group/access-group.model';
import { Permission } from '../permission/permission.model';

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

  async deleteUserById(id: number){
    const user = await this.userRepository.findOne({where: {id}})
    await user.destroy()
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

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      include: [
        {
          model: AccessGroup,
          through: {
            attributes: [],
          },
          include: [
            {
              model: Permission,
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    });
  }

  async findUserByNickname(nickname: string) {
    return this.userRepository.findOne({
      where: { nickname },
      include: { all: true },
    });
  }
}
