import { NextFunction, Request, Response } from "express";

class ErrorMiddleware {
  public static errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(error);
    res.status(500).json({ message: "Error cuuy", error });
  };
}

export default ErrorMiddleware;
