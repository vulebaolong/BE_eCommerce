import { KeyObject } from "crypto";
import { NextFunction, Request, Response } from "express";
import JWT, { JwtPayload } from "jsonwebtoken";
import { AuthFailureError, NotFoundError } from "../core/error.reponse.ts";
import keyTokenServices from "../services/keyToken.services.ts";
import { FlattenMaps, Types } from "mongoose";

const HEADER = {
   API_KEY: `x-api-key`,
   CLIENT_ID: `x-client-id`,
   AUTHORIZATION: `authorization`,
};

export const createTokenPair = (
   payload: string | object | Buffer,
   publicKey: string,
   privateKey: string
) => {
   try {
      // accessToken
      const accessToken = JWT.sign(payload, publicKey, {
         expiresIn: "2 days",
      });

      // refreshToken
      const refreshToken = JWT.sign(payload, privateKey, {
         expiresIn: "7 days",
      });

      JWT.verify(accessToken, publicKey, (err, decode) => {
         if (err) console.error(`error verify::`, err);

         console.log(`decode verify::`, decode);
      });

      return { accessToken, refreshToken };
   } catch (error) {
      console.log(error);
   }
};
export type TKeyStore = FlattenMaps<
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
export interface CustomRequest extends Request {
   keyStore: TKeyStore;
}
export const authentication = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const userId = req.headers[HEADER.CLIENT_ID] as string;
      if (!userId) throw new AuthFailureError(`Invalid Request userId`);

      const keyStore = await keyTokenServices.findByUserId(userId);
      if (!keyStore) throw new NotFoundError(`Not Found keyStore`);

      const accessToken = req.headers[HEADER.AUTHORIZATION] as string;
      if (!accessToken) throw new AuthFailureError(`Invalid Request accessToken`);

      const decodeUser = JWT.verify(accessToken, keyStore.publicKey) as JwtPayload;
      if (userId !== decodeUser.userId) throw new AuthFailureError(`Invalid userId`);
      req.keyStore = keyStore;
      return next();
   } catch (error) {
      next(error);
   }
};
