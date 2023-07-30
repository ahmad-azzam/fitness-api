import PackageController from "../../../controllers/package";
import PackageMiddleware from "../../../middlewares/package";
import ValidateMiddleware from "../../../middlewares/validate";
import { PayloadPackage } from "../../../schemas/package";
import BaseRouter from "../../base";

class SecurePackageRouter extends BaseRouter {
  routes(): void {
    this.router.get("/", PackageController.getAll);

    this.router.get(
      "/:id",
      PackageMiddleware.isPackageExist,
      PackageController.getOne
    );

    this.router.post(
      "/",
      ValidateMiddleware.validateRequest({ body: PayloadPackage }),
      PackageController.add
    );

    this.router.put(
      "/:id",
      PackageMiddleware.isPackageExist,
      ValidateMiddleware.validateRequest({ body: PayloadPackage }),
      PackageController.edit
    );

    this.router.delete(
      "/:id",
      PackageMiddleware.isPackageExist,
      PackageController.delete
    );
  }
}

export default SecurePackageRouter;
