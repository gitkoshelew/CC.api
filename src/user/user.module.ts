import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserAccess } from './user.access.model';
import { Quiz } from '../quiz/quiz.model';
import { AccessGroup } from '../access-group/access-group.model';
import { AccessGroupModule } from 'src/access-group/access-group.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, UserAccess, AccessGroup, Quiz]),
    AccessGroupModule,
  ],
  exports: [UserService],
})
export class UserModule {}
