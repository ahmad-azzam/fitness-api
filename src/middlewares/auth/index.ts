import { NextFunction, Request, Response } from "express";
import AuthUtils from "../../utils/AuthUtils";

class AuthMiddleware {
  public static authentication = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tokenCookie = req.cookies.token;
      if (!tokenCookie)
        throw { name: "Invalid token", status: 401, message: "No token " };

      const token = tokenCookie.split(" ")[1];
      const credential = AuthUtils.validateToken(token);

      console.log(credential);

      req.app.locals.credential = credential;

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default AuthMiddleware;
