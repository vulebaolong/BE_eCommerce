"use strict";

import express from "express";
import authRouter from "./auth/auth.router.ts";
import { apiKey, permission } from "../helpers/checkAuthApp.helper.ts";

const rootRouter = express.Router();

// check apiKey
rootRouter.use(apiKey);

// check permission
rootRouter.use(permission(`0000`));

rootRouter.use(`/v1/api`, authRouter);

rootRouter.get("/", (req, res, next) => res.status(200).json({ message: "hello word" }));

export default rootRouter;
