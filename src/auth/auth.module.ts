import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessGroupModule } from '../access-group/access-group.module';
import { PermissionModule } from '../permission/permission.module';
import { GoogleStrategy } from './oauth2/google/google.strategy';
import { SessionSerializer } from './oauth2/google/serializer';
import { SequelizeModule } from '@nestjs/sequelize';
import { GoogleUser } from './oauth2/google/google.model';

@Module({
  imports: [
    SequelizeModule.forFeature([GoogleUser]),
    UserModule,
    AccessGroupModule,
    PermissionModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || '12345',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'GOOGLE_AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
