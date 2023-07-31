import { NextFunction, Request, Response } from "express";
import PersonalTrainerService from "../../services/personalTrainer";

class PersonalTrainerMiddleware {
  public static isPersonalTrainerExist = async (
    req: Request<{ personalTrainerId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await PersonalTrainerService.getById(
        req.params.personalTrainerId
      );
      if (!result)
        throw {
          name: "Personal Trainer not found",
          status: 400,
          message: "Personal Trainer not found",
        };

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default PersonalTrainerMiddleware;
