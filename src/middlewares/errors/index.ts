import { NextFunction, Request, Response } from "express";

class ErrorMiddleware {
  public static errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("ini masuk ga si", error);
    res.status(500).json({ message: "Internal Server Error" });
  };
}

export default ErrorMiddleware;
