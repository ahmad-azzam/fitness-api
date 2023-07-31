import { NextFunction, Request, Response } from "express";
import MemberService from "../../services/member";
import { EUserType } from "../../schemas/auth/register";

class MemberMiddleware {
  public static isMemberExist = async (
    req: Request<{ memberId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await MemberService.getOne(req.params.memberId);
      if (!result)
        throw {
          name: "Member not found",
          status: 400,
          message: "Member not found",
        };

      next();
    } catch (error) {
      next(error);
    }
  };

  public static isMember = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.app.locals.credential.type !== EUserType.MEMBER)
        throw {
          name: "Unauthorized",
          status: 400,
          message: "Only member can access this method",
        };

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default MemberMiddleware;
