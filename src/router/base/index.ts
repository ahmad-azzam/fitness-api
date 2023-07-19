import { Router } from "express";

type TRouter = {
  routes(): void;
};

abstract class BaseRouter implements TRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract routes(): void;
}

export default BaseRouter;
