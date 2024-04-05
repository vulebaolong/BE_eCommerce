"use strict";

import express from "express";
import authController from "../../controllers/auth/auth.controller.ts";
import { asyncHandler } from "../../helpers/handleError.helper.ts";

const authRouter = express.Router();

// register
authRouter.post(`/shop/register`, authController.register);

export default authRouter;
