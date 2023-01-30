import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quiz } from 'src/quiz/quiz.model';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

@Module({
  providers: [InventoryService],
  controllers: [InventoryController],
  imports: [SequelizeModule.forFeature([Quiz])],
})
export class InventoryModule {}
