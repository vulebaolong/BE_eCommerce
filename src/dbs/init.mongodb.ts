"use strict";

import mongoose from "mongoose";
import { countConnect } from "../helpers/check.connect.ts";
import config from "../configs/config.mongodb.ts";

const {
  db: { host, name, port },
} = config;
const connectString = `mongodb://${host}:${port}/${name}`;

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
