import { HttpException } from '@nestjs/common';
import { HttpErrorTypes } from './error.types';

export class CustomErrorHandler extends HttpException {
  constructor(statusCode: number, message: string) {
    super(message, statusCode);
  }

  static BadRequest(message) {
    return new CustomErrorHandler(HttpErrorTypes.BAD_REQUEST, message);
  }

  static Unauthorized(message) {
    return new CustomErrorHandler(HttpErrorTypes.UNAUTHORIZED, message);
  }

  static Forbidden(message) {
    return new CustomErrorHandler(HttpErrorTypes.FORBIDDEN, message);
  }

  static NotFound(message) {
    return new CustomErrorHandler(HttpErrorTypes.NOT_FOUND, message);
  }

  static RequestTimeout(message) {
    return new CustomErrorHandler(HttpErrorTypes.REQUEST_TIMEOUT, message);
  }

  static TooManyRequest(message) {
    return new CustomErrorHandler(HttpErrorTypes.TOO_MANY_REQUESTS, message);
  }

  static InternalServerError(message) {
    return new CustomErrorHandler(
      HttpErrorTypes.INTERNAL_SERVER_ERROR,
      message,
    );
  }

  static ServiceUnavailable(message) {
    return new CustomErrorHandler(HttpErrorTypes.SERVICE_UNAVAILABLE, message);
  }
}
