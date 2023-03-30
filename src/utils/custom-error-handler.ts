import { HttpErrorTypes } from './error.types';

// <Remark>
// Do not use word custom here. Just ErrorHandler
// file name also error-handler.ts
export class CustomErrorHandler {
  static BadRequest(message) {
    return { statusCode: HttpErrorTypes.BAD_REQUEST, message: message };
  }

  static Unauthorized(message) {
    return { statusCode: HttpErrorTypes.UNAUTHORIZED, message: message };
  }

  static Forbidden(message) {
    return { statusCode: HttpErrorTypes.FORBIDDEN, message: message };
  }

  static NotFound(message) {
    return { statusCode: HttpErrorTypes.NOT_FOUND, message: message };
  }

  static RequestTimeout(message) {
    return { statusCode: HttpErrorTypes.REQUEST_TIMEOUT, message: message };
  }

  static TooManyRequest(message) {
    return { statusCode: HttpErrorTypes.TOO_MANY_REQUESTS, message: message };
  }

  static InternalServerError(message) {
    return {
      statusCode: HttpErrorTypes.INTERNAL_SERVER_ERROR,
      message: message,
    };
  }

  static SERVICE_UNAVAILABLE(message) {
    return { statusCode: HttpErrorTypes.BAD_REQUEST, message: message };
  }
}
