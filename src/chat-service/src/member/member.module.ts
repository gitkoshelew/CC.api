import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MemberModel } from './models/member.model';

@Module({
  imports: [SequelizeModule.forFeature([MemberModel])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
