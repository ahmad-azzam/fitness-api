import AuthController from "../../../controllers/auth/AuthController";
import BaseRouter from "../../base";

class AuthRouter extends BaseRouter {
  routes(): void {
    this.router.post("/register", AuthController.register);
  }
}

export default new AuthRouter().router;
