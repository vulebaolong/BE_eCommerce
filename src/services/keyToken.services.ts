"use strict";
import crypto from "crypto";
import keytokenModels from "../models/keytoken.model.ts";
import { Types } from "mongoose";

type TCreateTokenServices = {
  userId: Types.ObjectId;
  publicKey: string;
  privateKey: string;
};

class KeyTokenServies {
  async createKeyToken({ userId, publicKey, privateKey }: TCreateTokenServices): Promise<string | false> {
    try {
      const token = await keytokenModels.create({
        user: userId,
        publicKey,
        privateKey,
      });

      return token ? token.publicKey : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new KeyTokenServies();
