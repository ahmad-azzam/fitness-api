import { NextFunction, Request, Response } from "express";
import { PayloadPackage } from "../../schemas/package";
import PackageService from "../../services/package";

class PackageController {
  add = async (
    req: Request<{}, {}, PayloadPackage>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await PackageService.add(req.body);
      res.status(200).json({ messages: "success add package" });
    } catch (error) {
      next(error);
    }
  };
}

export default new PackageController();
