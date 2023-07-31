import { NextFunction, Request, Response } from "express";
import MemberService from "../../services/member";

class MemberController {
  getOne = async (
    req: Request<{ memberId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await MemberService.getOne(req.params.memberId);
      res.status(200).json({ message: "Success get member", result });
    } catch (error) {
      next(error);
    }
  };

  managePersonalTrainer = async (
    req: Request<{ personalTrainerId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.app.locals.credential.userInfo.id;
      await MemberService.managePersonalTrainer(
        id,
        req.params.personalTrainerId
      );

      res.status(200).json({ message: "Success updated personal trainer" });
    } catch (error) {
      next(error);
    }
  };
}

export default new MemberController();
