import { NextFunction, Request, Response } from "express";
import PackageService from "../../services/package";

class PackageMiddleware {
  public static isPackageExist = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await PackageService.getById(req.params.id);
      if (!result)
        throw {
          name: "Package not found",
          status: 400,
          message: "Package not found",
        };

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default PackageMiddleware;
