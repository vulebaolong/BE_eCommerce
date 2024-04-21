"use strict";

import bcrypt from "bcrypt";
import crypto from "crypto";
import { AuthFailureError, ConflicRequestError, InternalServerError, NotFoundError } from "../core/error.reponse.ts";
import { getInfoData } from "../helpers/app.helper.ts";
import { createTokenPair } from "../helpers/auth.helper.ts";
import shopModels from "../models/shop.model.ts";
import keyTokenServices from "./keyToken.services.ts";
import shopServices from "./shop.services.ts";

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
type TLoginServies = {
   email: string;
   password: string;
   refreshToken: string | null;
};

class AuthServices {
   async register({ name, email, password, roles }: TRegisterServies) {
      try {
         // step 1: check email exits
         const exitsShop = await shopModels.findOne({ email }).lean();
         if (exitsShop) throw new ConflicRequestError(`Error Shop Already Register`);

         const passwordHash = await bcrypt.hash(password, 1);
         const newShop = await shopModels.create({
            email,
            name,
            password: passwordHash,
            roles: [ROLE_SHOP.SHOP],
         });
         if (!newShop) throw new InternalServerError(`Create shop error`);

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
         const tokens = createTokenPair(
            {
               userId: newShop._id,
               email: newShop.email,
            },
            publicKey,
            privateKey
         );
         if (!tokens) throw new InternalServerError(`Create token error`);

         const keyStore = await keyTokenServices.createKeyToken({
            refreshToken: tokens.refreshToken,
            userId: newShop._id,
            publicKey,
            privateKey,
         });
         if (!keyStore) throw new InternalServerError(`keyStore error`);       

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

   /**
    * 1 - check email in dbs
    * 2 - match password
    * 3 - create AT and RF and save
    * 4 - generate tokens
    * 5 - get data return login
    */
   async login({ email, password, refreshToken = null }: TLoginServies) {
      // 1
      const exitsShop = await shopServices.findByEmail({ email });
      if (!exitsShop) throw new NotFoundError(`Shop not registered`);

      // 2
      const match = bcrypt.compareSync(password, exitsShop.password)
      if (!match) throw new AuthFailureError(`Email or password is incorrect`);

      const  userId = exitsShop._id
      // 3
      const publicKey = crypto.randomBytes(64).toString(`hex`);
      const privateKey = crypto.randomBytes(64).toString(`hex`);
      const tokens = createTokenPair(
         {
            userId,
            email: exitsShop.email,
         },
         publicKey,
         privateKey
      );
      if (!tokens) throw new InternalServerError(`Create token error`);

      const keyStore = await keyTokenServices.createKeyToken({
         refreshToken: tokens.refreshToken,
         userId,
         publicKey,
         privateKey,
      });
      if (!keyStore) throw new InternalServerError(`keyStore error`);       

      return {
         shop: getInfoData({
            fileds: [`_id`, `name`, `email`],
            object: exitsShop,
         }),
         tokens,
      };
   }
}

export default new AuthServices();
