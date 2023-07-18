import { NextFunction, Request, Response } from "express";
import { RegisterPayload } from "../../schemas/auth/register";
import AuthService from "../../services/auth/AuthService";
import { Sequelize, ValidationError } from "sequelize";

class AuthController {
  register = async (
    req: Request<{}, {}, RegisterPayload>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await AuthService.register(req.body);

      res.status(200).json({ messages: "Connected successfully" });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errorPayload = {
          name: error.name,
          erros: error.errors,
        };
        next(errorPayload);
      }

      next(error);
    }
  };
}

export default new AuthController();
