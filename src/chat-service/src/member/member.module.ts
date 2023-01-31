import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MemberEntity } from './entities/member.entity';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [SequelizeModule.forFeature([MemberEntity])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
