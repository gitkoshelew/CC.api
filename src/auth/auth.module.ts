import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessGroupModule } from '../access-group/access-group.module';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    UserModule,
    AccessGroupModule,
    PermissionModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || '12345',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
