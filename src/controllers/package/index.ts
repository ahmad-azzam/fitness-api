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
      res.status(201).json({ messages: "success add package" });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await PackageService.getAll();
      res.status(200).json({ messages: "Success get all packages", result });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await PackageService.getById(req.params.id);
      res.status(200).json({ messages: "Success get package", result });
    } catch (error) {
      next(error);
    }
  };

  edit = async (
    req: Request<{ id: string }, {}, PayloadPackage>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await PackageService.edit(req.body, req.params.id);
      res.status(200).json({ messages: "Success edit package" });
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await PackageService.destroy(req.params.id);
      res.status(200).json({ messages: "Success delete package" });
    } catch (error) {
      next(error);
    }
  };
}

export default new PackageController();
