"use strict";

import { NextFunction, Response, Request } from "express";
import authServices from "../../services/auth.services.ts";

class AuthController {
   async register(req: Request, res: Response, next: NextFunction) {
      try {
         return res.status(201).json(await authServices.register(req.body));
      } catch (error) {
         next(error)
      }
   }
}

export default new AuthController();
