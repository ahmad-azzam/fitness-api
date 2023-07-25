import PackageController from "../../../controllers/package";
import ValidateMiddleware from "../../../middlewares/validate";
import { PayloadPackage } from "../../../schemas/package";
import BaseRouter from "../../base";

class SecurePackageRouter extends BaseRouter {
  routes(): void {
    this.router.post(
      "/",
      ValidateMiddleware.validateRequest({ body: PayloadPackage }),
      PackageController.add
    );
  }
}

export default SecurePackageRouter;
