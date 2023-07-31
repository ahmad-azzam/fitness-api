import { NextFunction, Request, Response } from "express";
import UserService from "../../services/user";

class UserMiddleware {
  public static isUserExist = async (
    req: Request<{ userId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await UserService.getById(req.params.userId);
      if (!result)
        throw {
          name: "User not found",
          status: 400,
          message: "User not found",
        };

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default UserMiddleware;
