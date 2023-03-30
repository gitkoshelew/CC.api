import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { AddAccessDto } from "./dto/addAccessToUser.dto";
import { AccessGroupService } from "src/access-group/access-group.service";
import { CustomErrorHandler } from "src/utils/custom-error-handler";
import { AccessGroup } from "../access-group/access-group.model";
import { Permission } from "../permission/permission.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private accessRepository: AccessGroupService,
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      // <Remark>
      // return user directly
      return await this.userRepository.create(dto);
    } catch (error) {
      throw CustomErrorHandler.BadRequest(error.errors[0].message);
    }
  }

  async getUserById(id: number) {
    try {
      return await this.userRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw CustomErrorHandler.BadRequest("User with this id doen't exist");
    }
  }

  async getAllUsers() {
    try {
      return await this.userRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw CustomErrorHandler.InternalServerError('Server problems');
    }
  }

  async deleteUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      await user.destroy();
      return this.userRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw CustomErrorHandler.BadRequest("User with this id doen't exist");
    }
  }

  async addAccessToUser(dto: AddAccessDto) {
    try {
      const access = await this.accessRepository.getAccessGroupById(
        dto.accessGroupId,
      );
      const user = await this.getUserById(dto.userId);
      return await user.$add('access', access.id);
    } catch (error) {
      throw CustomErrorHandler.BadRequest(
        'Check properties of selected access group or user',
      );
    }
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
