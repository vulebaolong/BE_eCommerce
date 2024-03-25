"use strict";

import mongoose from "mongoose";
import { countConnect } from "../helpers/check.connect.ts";

const connectString = `mongodb://localhost:27017/shopDev`;

class Database {
  private static instance: Database;

  constructor() {
    this.connect();
  }

  //connect
  connect(type = "mongodb") {
    //dev
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString, {
        maxPoolSize: 50,
      })
      .then(() => {
        console.log(`Connected Mongodb Success`, countConnect());
      })
      .catch((err) => {
        console.log(`Error Connect!`);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

export const instanceMongodb = Database.getInstance();
