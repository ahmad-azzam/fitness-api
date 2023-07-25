import AuthController from "../../../controllers/auth";
import ValidateMiddleware from "../../../middlewares/validate";
import { PayloadLogin } from "../../../schemas/auth/login";
import { PayloadRegister } from "../../../schemas/auth/register";
import BaseRouter from "../../base";

class AuthRouter extends BaseRouter {
  routes(): void {
    this.router.post(
      "/register",
      ValidateMiddleware.validateRequest({ body: PayloadRegister }),
      AuthController.register
    );
    this.router.post(
      "/login",
      ValidateMiddleware.validateRequest({ body: PayloadLogin }),
      AuthController.login
    );
  }
}

export default AuthRouter;
