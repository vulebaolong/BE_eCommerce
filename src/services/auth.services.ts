"use strict";

import shopModels from "../models/shop.model.ts";
import bcrypt from "bcrypt";
import crypto from "crypto";
import keyTokenServices from "./keyToken.services.ts";
import { createTokenPair } from "../helpers/auth.helper.ts";
import { getInfoData } from "../helpers/app.helper.ts";
import { BadRequestError } from "../core/error.reponse.ts";

const ROLE_SHOP = {
   SHOP: `SHOP`,
   WRITER: `WRITER`,
   EDITOR: `EDITOR`,
   ADMIN: `ADMIN`,
};

type TRegisterServies = {
   name: string;
   email: string;
   password: string;
   roles: string[];
   abc: any;
};

class AuthServices {
   async register({ name, email, password, roles }: TRegisterServies) {
      try {
         // step 1: check email exits
         const exitsShop = await shopModels.findOne({ email }).lean();
         if (exitsShop) throw new BadRequestError(`Error Shop Already Register`);

         const passwordHash = await bcrypt.hash(password, 1);
         const newShop = await shopModels.create({
            email,
            name,
            password: passwordHash,
            roles: [ROLE_SHOP.SHOP],
         });
         if (!newShop) throw new BadRequestError(`Create shop error`);

         // created privateKey, publicKey
         // const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
         //   modulusLength: 4096,
         //   publicKeyEncoding: {
         //     type: `pkcs1`,
         //     format: "pem",
         //   },
         //   privateKeyEncoding: {
         //     type: `pkcs1`,
         //     format: "pem",
         //   },
         // });
         const publicKey = crypto.randomBytes(64).toString(`hex`);
         const privateKey = crypto.randomBytes(64).toString(`hex`);

         const keyStore = await keyTokenServices.createKeyToken({
            userId: newShop._id,
            publicKey,
            privateKey,
         });
         if (!keyStore) throw new BadRequestError(`keyStore error`);

         const tokens = createTokenPair(
            {
               userId: newShop._id,
               email: newShop.email,
            },
            publicKey,
            privateKey
         );

         console.log(tokens);

         return {
            shop: getInfoData({
               fileds: [`_id`, `name`, `email`],
               object: newShop,
            }),
            tokens,
         };
      } catch (error) {
         throw error;
      }
   }
}

export default new AuthServices();
