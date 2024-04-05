"use strict";

import express from "express";
import authRouter from "./auth/auth.router.ts";

const rootRouter = express.Router();

rootRouter.use(`/v1/api`, authRouter);
rootRouter.get("/", (req, res, next) => {
  console.log(req.body);
  return res.status(200).json({
    message: "hello word",
  });
});

export default rootRouter;
