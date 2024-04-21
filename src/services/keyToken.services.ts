"use strict";
import crypto from "crypto";
import keytokenModels from "../models/keytoken.model.ts";
import { Types } from "mongoose";

type TCreateTokenServices = {
   userId: Types.ObjectId;
   refreshToken: string;
   publicKey: string;
   privateKey: string;
};

class KeyTokenServies {
   async createKeyToken({
      userId,
      refreshToken,
      publicKey,
      privateKey,
   }: TCreateTokenServices): Promise<string | boolean> {
      try {
         // lv 1
         // const token = await keytokenModels.create({
         //   user: userId,
         //   publicKey,
         //   privateKey,
         // });

         // return token ? token.publicKey : false;

         //  lv 2
         const filter = { user: userId };

         const update = {
            publicKey,
            privateKey,
            refreshTokensUsed: [],
            refreshToken,
         };

         const options = {
            upsert: true,
            new: true,
         };
         
         const tokens = await keytokenModels.findOneAndUpdate(filter, update, options);

         return tokens ? tokens.publicKey : false;
      } catch (error) {
         console.log(error);
         return false;
      }
   }
}

export default new KeyTokenServies();
