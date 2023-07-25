import { NextFunction, Request, Response } from "express";
import { PayloadRegister } from "../../schemas/auth/register";
import AuthService from "../../services/auth";
import { Sequelize, ValidationError } from "sequelize";
import { PayloadLogin } from "../../schemas/auth/login";

class AuthController {
  register = async (
    req: Request<{}, {}, PayloadRegister>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await AuthService.register(req.body);

      res.status(201).json({ messages: "Register Successfully" });
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

  login = async (
    req: Request<{}, {}, PayloadLogin>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await AuthService.login(req.body, res);

      res.status(200).json({ messages: "Login Successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();
