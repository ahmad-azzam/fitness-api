import Packages from "../../models/packages";
import { PayloadPackage } from "../../schemas/package";

type TPackageRepo = {
  add: (packages: PayloadPackage) => Promise<Packages>;
};

class PackageRepo implements TPackageRepo {
  add = async (packages: { type: string; price: number }) => {
    return await Packages.create(packages);
  };
}

export default new PackageRepo();
