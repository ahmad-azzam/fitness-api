import { Router } from "express";
import AuthRouter from "./public/auth/AuthRouter";

class MainRouter {
  public router: Router;

  private authRouter: AuthRouter;

  constructor() {
    this.router = Router();
    this.authRouter = new AuthRouter();

    this.getRoutesPublic();
  }

  private getRoutesPublic = () => {
    this.router.use(this.authRouter.router);
  };
}

export default MainRouter;
