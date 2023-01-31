import { HttpException } from '@nestjs/common';

export class CustomErrorHandler extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}
