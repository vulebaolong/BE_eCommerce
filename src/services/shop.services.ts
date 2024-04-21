"use strict";

import shopModels from "../models/shop.model.ts";

type TFindByEmail = {
   email: string;
   select?: {
      email: number;
      password: number;
      name: number;
      status: number;
      roles: number;
   };
};

class ShopServices {
   async findByEmail({
      email,
      select = { email: 1, password: 2, name: 1, status: 1, roles: 1 },
   }: TFindByEmail) {
      return await shopModels.findOne({ email }).select(select).lean();
   }
}

export default new ShopServices();

