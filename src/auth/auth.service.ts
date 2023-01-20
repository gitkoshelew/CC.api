import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.model';
import { AddAccessDto } from '../user/dto/addAccessToUser.dto';
import { AccessGroup } from '../access-group/access-group.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const isEmailExist = await this.userService.findUserByEmail(userDto.email);
    if (isEmailExist)
      throw new HttpException(
        'The email address you entered is already registered',
        HttpStatus.BAD_REQUEST,
      );
    const isNickNameExist = await this.userService.findUserByNickname(
      userDto.nickname,
    );
    if (isNickNameExist)
      throw new HttpException(
        'The nickname you entered is already registered',
        HttpStatus.BAD_REQUEST,
      );
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(userDto.password, salt);
    const user = await this.userService.createUser({
      ...userDto,
      password: passwordHash,
    });

    const addAccessGroupForUser: AddAccessDto = {
      userId: user.id,
      accessGroupId: 1,
    };
    await this.userService.addAccessToUser(addAccessGroupForUser);
    const findUserWithAccessGroup = await this.userService.findUserByEmail(
      userDto.email,
    );
    console.log(findUserWithAccessGroup);
    return this.generateToken(user, findUserWithAccessGroup.access);
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateToken(userDto);
    return this.generateToken(user, user.access);
  }

  private async generateToken(user: User, accessGroup: AccessGroup[]) {
    const payload = { userId: user.id, accessGroup: accessGroup };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '24h' }),
    };
  }

  private async validateToken(userDto: LoginUserDto) {
    const isEmailExist = await this.userService.findUserByEmail(userDto.email);
    if (!isEmailExist)
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      isEmailExist.password,
    );
    if (!passwordEquals)
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    return isEmailExist;
  }
}
