import { NextFunction, Request, Response } from "express";

class MyError extends Error {
   status: number;
   constructor(message: string, status: number) {
      super(message);
      this.status = status;
   }
}

export const handleNotFoundEndpoint = (req: Request, res: Response, next: NextFunction) => {
   console.log(req.url);
   const error = new MyError(`Not Found: ${req.url}`, 404);
   next(error);
};

export const handlError = (error: MyError, req: Request, res: Response, next: NextFunction) => {
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
