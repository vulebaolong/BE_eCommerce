"use strict";

import mongoose from "mongoose";
import os from "os";
import process from "process";

const _SECONDS = 5000;

// count connect
export const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections::${numConnection}`);
};

// check overload
export let idCheckOverload: undefined | NodeJS.Timeout = undefined;
export const checkOverload = () => {
  idCheckOverload = setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    //Example maximum number of connections based on number of cores
    const maxConnections = numCores * 5;

    console.log(`Active connection: ${numConnection}`);
    console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);

    if (numConnection > maxConnections) {
      console.log(`Connection overload detected!`);
    }
  }, _SECONDS);
};
