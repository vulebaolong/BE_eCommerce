"use strict";

import { NextFunction, Response, Request } from "express";
import authServices from "../../services/auth.services.ts";
import { CREATED, SuccessResponse } from "../../core/sucess.reponse.ts";
import { FlattenMaps, Types } from "mongoose";


type TKeyStore = FlattenMaps<
   {
      createdAt: NativeDate;
      updatedAt: NativeDate;
   } & {
      _id: Types.ObjectId;
      refreshToken: string;
      user: Types.ObjectId;
      privateKey: string;
      publicKey: string;
      refreshTokensUsed: any[];
   }
>;
interface CustomRequest extends Request {
   keyStore: TKeyStore;
}
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

   async login(req: Request, res: Response, next: NextFunction) {
      try {
         new SuccessResponse({
            message: `Login OK!`,
            metaData: await authServices.login(req.body),
         }).send(res);
      } catch (error) {
         next(error);
      }
   }

   async logout(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         new SuccessResponse({
            message: `Logout OK!`,
            metaData: await authServices.logout(req.keyStore),
         }).send(res);
      } catch (error) {
         next(error);
      }
   }
}

export default new AuthController();
