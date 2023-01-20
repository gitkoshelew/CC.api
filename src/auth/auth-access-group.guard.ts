import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './auth-access-group.decorator';
import { AccessGroupService } from '../access-group/access-group.service';

@Injectable()
export class AuthAccessGroupGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private accessGroupService: AccessGroupService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredPermissions = this.reflector.getAllAndOverride(
        PERMISSION_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredPermissions) {
        return true;
      }
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token)
        throw new HttpException(
          'User is not authorized',
          HttpStatus.UNAUTHORIZED,
        );
      const user = this.jwtService.verify(token); // В токене юзера передаем accessGroup:[{id:1, name: 'User'}]
      req.user = user;

      const availablePermission = [];
      for (const access of user.accessGroup) {
        const permissionForCurrentAccessGroup =
          await this.accessGroupService.getAccessGroupById(access.id); // Ищем права для каждой из accessGroup
        for (const permissionName of permissionForCurrentAccessGroup.permissions) {
          availablePermission.push(permissionName.name); // В каждой из групп может быть несколько прав, собираем их все в массив
        }
      }
      return requiredPermissions.every(
        (access) => availablePermission.includes(access), // requiredPermissions - массив который мы передаем на защиту эндпоинта
      );
    } catch (e) {
      throw new HttpException(
        'User is not authorized',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
