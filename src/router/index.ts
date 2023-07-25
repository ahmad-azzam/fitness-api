import { Router } from "express";
import AuthRouter from "./public/auth";
import AuthMiddleware from "../middlewares/auth";
import SecurePackageRouter from "./secure/package";

class MainRouter {
  public router: Router;

  private authRouter: AuthRouter;

  private securedPackageRouter: SecurePackageRouter;

  constructor() {
    this.router = Router();
    this.authRouter = new AuthRouter();
    this.securedPackageRouter = new SecurePackageRouter();

    this.getRoutesPublic();
    this.getRoutesSecure();
  }

  private getRoutesPublic = () => {
    this.router.use(this.authRouter.router);
  };

  private getRoutesSecure = () => {
    this.router.use(AuthMiddleware.authentication);

    this.router.use("/secured/package", this.securedPackageRouter.router);
  };
}

export default MainRouter;
