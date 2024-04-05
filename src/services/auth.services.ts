"use strict";

import shopModels from "../models/shop.models.ts";
import bcrypt from "bcrypt";
import crypto from "crypto";
import keyTokenServices from "./keyToken.services.ts";
import { createTokenPair } from "../helpers/auth.helper.ts";
import { getInfoData } from "../helpers/app.helper.ts";

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
};

class AuthServices {
  async register({ name, email, password, roles }: TRegisterServies) {
    try {
      // step 1: check email exits
      const hodeShop = await shopModels.findOne({ email }).lean();
      if (hodeShop) {
        return {
          code: `xxx`,
          message: `Shop already registered error`,
          status: `error`,
          data: null,
        };
      }

      const passwordHash = await bcrypt.hash(password, 1);
      const newShop = await shopModels.create({
        email,
        name,
        password: passwordHash,
        roles: [ROLE_SHOP.SHOP],
      });
      if (!newShop) {
        return {
          code: `xxx`,
          message: `error`,
          status: `error`,
          data: null,
        };
      }

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
      const publicKey = crypto.randomBytes(64).toString(`hex`)
      const privateKey = crypto.randomBytes(64).toString(`hex`)

      const keyStore = await keyTokenServices.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey
      });
      if (!keyStore) {
        return {
          code: `xxx`,
          message: `keyStore error`,
          status: `error`,
          data: null,
        };
      }


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
        code: `xxx`,
        message: ``,
        status: `success`,
        data: {
          shop: getInfoData({
            fileds: [`_id`, `name`, `email`],
            object: newShop,
          }),
          tokens,
        },
      };
    } catch (error: any) {
      return {
        code: `xxx`,
        message: error.message,
        status: `error`,
        data: null,
      };
    }
  }
}

export default new AuthServices();
