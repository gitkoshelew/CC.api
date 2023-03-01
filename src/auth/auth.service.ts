import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto, UserViewType } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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
    return this.generateToken(user.id);
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user.id);
  }

  private async generateToken(userId: number) {
    const payload = { userId };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '24h' }),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
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

  private async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }

  async updateToken(refreshToken: string) {
    const user = await this.verifyToken(refreshToken);
    if (!user) throw new UnauthorizedException([]);
    return this.generateToken(user.userId);
  }

  async checkCurrentUser(userId: number) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new NotFoundException('User is not found');
    const userInfo: UserViewType = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      nickname: user.nickname,
    };
    return userInfo;
  }
}
