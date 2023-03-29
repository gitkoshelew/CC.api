import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuestionOptionsController } from './question-options.controller';
import { QuestionOptions } from './question-options.model';
import { QuestionOptionsService } from './question-options.service';

@Module({
  controllers: [QuestionOptionsController],
  providers: [QuestionOptionsService],
  imports: [SequelizeModule.forFeature([QuestionOptions])],
  exports: [QuestionOptionsService],
})
export class QuestionOptionsModule {}
