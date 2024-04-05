import { NextFunction, Request, Response } from "express";

class MyError extends Error {
   status: number;
   constructor(message: string, status: number) {
      super(message);
      this.status = status;
   }
}

export const handleError = (req: Request, res: Response, next: NextFunction) => {
   const error = new MyError(`Not Found`, 404);
   next(error);
};

export const endError = (error: MyError, req: Request, res: Response, next: NextFunction) => {
   const statusCode = error.status || 500;
   return res.status(statusCode).json({
      status: `error`,
      code: statusCode,
      message: error.message || `Internal Server Error`,
   });
};

export const asyncHandler = (
   fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
   return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
   };
};
