"use strict";

import { Response } from "express";

const STATUS_CODE = {
   OK: 200,
   CREATED: 201,
};

const REASON_STATUS_CODE = {
   OK: `Success`,
   CREATED: `Created!`,
};

type TSuccessResponse = {
   message: string;
   statusCode?: number;
   reasonStatusCode?: string;
   metaData?: any;
};

class SuccessResponse {
   message: string;
   status: number;
   reasonStatusCode: string;
   metaData: any;
   constructor({
      message,
      statusCode = STATUS_CODE.OK,
      reasonStatusCode = REASON_STATUS_CODE.OK,
      metaData = {},
   }: TSuccessResponse) {
      this.message = message;
      this.status = statusCode;
      this.reasonStatusCode = reasonStatusCode;
      this.metaData = metaData;
   }

   send(res: Response, headers = {}) {
      return res.status(this.status).json(this);
   }
}

type TOK = {
   message: string;
   metaData: any;
};

export class OK extends SuccessResponse {
   constructor({ message, metaData }: TOK) {
      super({ message, metaData });
   }
}

type TCREATED = {
   message: string;
   metaData: any;
   statusCode?: number;
   reasonStatusCode?: string;
};

export class CREATED extends SuccessResponse {
   constructor({
      message,
      statusCode = STATUS_CODE.CREATED,
      reasonStatusCode = REASON_STATUS_CODE.CREATED,
      metaData,
   }: TCREATED) {
      super({ message, statusCode, reasonStatusCode, metaData });
   }
}
