"use strict";

import { NextFunction, Response, Request } from "express";
import authServices from "../../services/auth.services.ts";
import { CREATED } from "../../core/sucess.reponse.ts";

class AuthController {
   async register(req: Request, res: Response, next: NextFunction) {
      try {
         new CREATED({
            message: `Register OK!`,
            metaData: await authServices.register(req.body),
         }).send(res);
      } catch (error) {
         next(error);
      }
   }
}

export default new AuthController();
