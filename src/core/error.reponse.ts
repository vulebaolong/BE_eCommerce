const STATUS_CODE = {
   FORBIDDEN: 403,
   CONFLIT: 409,
};

const RESPONSE_STATUS_CODE = {
   FORBIDDEN: `Bad Request Error`,
   CONFLICT: `Conflict error`,
};

class ErrorResponse extends Error {
   status: number;
   constructor(message: string, status: number) {
      super(message);
      this.status = status;
   }
}

export class ConflicRequestError extends ErrorResponse {
   constructor(
      message: string = RESPONSE_STATUS_CODE.CONFLICT,
      statusCode: number = STATUS_CODE.FORBIDDEN
   ) {
      super(message, statusCode);
   }
}

export class BadRequestError extends ErrorResponse {
   constructor(
      message: string = RESPONSE_STATUS_CODE.CONFLICT,
      statusCode: number = STATUS_CODE.FORBIDDEN
   ) {
      super(message, statusCode);
   }
}
