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

@Injectable()
export class AuthAccessGroupGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
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
      if (bearer !== 'Bearer' || !token) {
        throw new HttpException(
          'User is not authorized',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const user = this.jwtService.verify(token);
      req.user = user;

      for (const access of user.accessGroup) {
        const permissionForCurrentAccessGroup = access.permissions;
        for (const permission of permissionForCurrentAccessGroup) {
          if (permission.name === requiredPermissions) {
            return true;
          }
        }
      }
      return false;

    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
