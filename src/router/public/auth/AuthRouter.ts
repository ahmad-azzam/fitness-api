import AuthController from "../../../controllers/auth/AuthController";
import ValidateMiddleware from "../../../middlewares/validate";
import { RegisterPayload } from "../../../schemas/auth/register";
import BaseRouter from "../../base";

class AuthRouter extends BaseRouter {
  routes(): void {
    this.router.post(
      "/register",
      ValidateMiddleware.validateRequest({ body: RegisterPayload }),
      AuthController.register
    );
  }
}

export default AuthRouter;
