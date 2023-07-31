import { Router } from "express";
import AuthRouter from "./public/auth";
import AuthMiddleware from "../middlewares/auth";
import SecurePackageRouter from "./secure/package";
import SecureMemberRouter from "./secure/member";

class MainRouter {
  public router: Router;

  private authRouter: AuthRouter;

  private securedPackageRouter: SecurePackageRouter;
  private secureMemberRouter: SecureMemberRouter;

  constructor() {
    this.router = Router();

    this.authRouter = new AuthRouter();

    this.securedPackageRouter = new SecurePackageRouter();
    this.secureMemberRouter = new SecureMemberRouter();

    this.getRoutesPublic();
    this.getRoutesSecure();
  }

  private getRoutesPublic = () => {
    this.router.use("/public", this.authRouter.router);
  };

  private getRoutesSecure = () => {
    this.router.use(AuthMiddleware.authentication);

    this.router.use("/secured/package", this.securedPackageRouter.router);
    this.router.use("/secured/member", this.secureMemberRouter.router);
  };
}

export default MainRouter;
