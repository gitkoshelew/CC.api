import { Module } from '@nestjs/common';
import { EnumsController } from './enums.controller';
import { EnumsService } from './enums.service';

@Module({
  providers: [EnumsService],
  controllers: [EnumsController],
  imports: [],
})
export class EnumsModule {}
