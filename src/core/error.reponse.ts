import { reasonPhrases } from "../helpers/reasonPhrases.helper.ts";
import { statusCodes } from "../helpers/statusCodes.helper.ts";

class ErrorResponse extends Error {
   status: number;
   constructor(message: string, status: number) {
      super(message);
      this.status = status;
   }
}

export class ConflicRequestError extends ErrorResponse {
   constructor(
      message: string = reasonPhrases.CONFLICT,
      statusCode: number = statusCodes.CONFLICT
   ) {
      super(message, statusCode);
   }
}

export class BadRequestError extends ErrorResponse {
   constructor(
      message: string = reasonPhrases.BAD_REQUEST,
      statusCode: number = statusCodes.BAD_REQUEST
   ) {
      super(message, statusCode);
   }
}

export class AuthFailureError extends ErrorResponse {
   constructor(
      message: string = reasonPhrases.UNAUTHORIZED,
      statusCode: number = statusCodes.UNAUTHORIZED
   ) {
      super(message, statusCode);
   }
}

export class InternalServerError extends ErrorResponse {
   constructor(
      message: string = reasonPhrases.INTERNAL_SERVER_ERROR,
      statusCode: number = statusCodes.INTERNAL_SERVER_ERROR
   ) {
      super(message, statusCode);
   }
}

export class NotFoundError extends ErrorResponse {
   constructor(
      message: string = reasonPhrases.NOT_FOUND,
      statusCode: number = statusCodes.NOT_FOUND
   ) {
      super(message, statusCode);
   }
}
