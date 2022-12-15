import { Controller, Get, Param } from "@nestjs/common";
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/quiz')
  getQuiz(): string {
    return this.appService.getQuiz()
  }

  @Get('/quiz/:id')
  getOneQuiz(@Param('id') id : string): string {
    return this.appService.getOneQuiz(id)
  }
}
