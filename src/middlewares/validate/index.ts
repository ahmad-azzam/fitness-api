import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

type RequestValidators = {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
};

class ValidateMiddleware {
  static validateRequest = (validators: RequestValidators) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (validators.body) {
          req.body = await validators.body.parseAsync(req.body);
        }
        if (validators.params) {
          req.params = await validators.params.parseAsync(req.params);
        }
        if (validators.query) {
          req.query = await validators.query.parseAsync(req.query);
        }
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          next({
            name: error.name,
            errors: error.errors,
          });
        }
        next(error);
      }
    };
  };
}

export default ValidateMiddleware;
