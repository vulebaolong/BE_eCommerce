"use strict";

import { NextFunction, Response, Request } from "express";
import authServices from "../../services/auth.services.ts";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(`[P]:::register:::`, req.body);

      return res.status(201).json(await authServices.register(req.body));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default new AuthController();
