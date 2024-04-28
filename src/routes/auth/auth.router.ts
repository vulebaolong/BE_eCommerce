"use strict";

import express from "express";
import authController from "../../controllers/auth/auth.controller.ts";
import { asyncHandler } from "../../helpers/handleError.helper.ts";
import { authentication, CustomRequest } from "../../helpers/auth.helper.ts";


const authRouter = express.Router();

// register
authRouter.post(`/shop/register`, authController.register);
// login
authRouter.post(`/shop/login`, authController.login);

// authRouter.use(authentication)
// logout
authRouter.post(`/shop/logout`, authentication as any, authController.logout as any);

export default authRouter;
