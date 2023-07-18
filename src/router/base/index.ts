import { Router } from "express";
import { TRouter } from "../types";

abstract class BaseRouter implements TRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract routes(): void;
}

export default BaseRouter;
