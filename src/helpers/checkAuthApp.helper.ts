"use strict";
import { NextFunction, Response, Request } from "express";
import { findById } from "../services/apiKey.services.ts";
import { Types } from "mongoose";

const HEADER = {
   API_KEY: `x-api-key`,
   AUTHORIZATION: `authorization`,
};

interface CustomRequest extends Request {
   objKey?: {
      _id: Types.ObjectId;
      key: string;
      status: boolean;
      permissions: string[];
      createdAt: NativeDate;
      updatedAt: NativeDate;
   };
}

export const apiKey = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const key = req.headers[HEADER.API_KEY]?.toString();
      if (!key) {
         return res.status(403).json({
            code: `403`,
            message: `Forbidden Error`,
            status: `error`,
            data: null,
         });
      }

      // check apiKey
      const objKey = await findById(key);
      if (!objKey) {
         return res.status(403).json({
            code: `403`,
            message: `Forbidden Error`,
            status: `error`,
            data: null,
         });
      }

      req.objKey = objKey;

      return next();
   } catch (error) {}
};

export const permission = (permission: `0000` | `1111` | `2222`) => {
   return (req: CustomRequest, res: Response, next: NextFunction) => {
      if (!req.objKey?.permissions) {
         return res.status(403).json({
            code: `403`,
            message: `Permisstion Denied`,
            status: `error`,
            data: null,
         });
      }

      console.log(`permissions`, req.objKey?.permissions);
      const validPermission = req.objKey.permissions.includes(permission);
      if (!validPermission) {
         return res.status(403).json({
            code: `403`,
            message: `Permisstion Denied`,
            status: `error`,
            data: null,
         });
      }

      return next();
   };
};
