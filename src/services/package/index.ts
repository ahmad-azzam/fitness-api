import Packages from "../../models/packages";
import PackageRepo from "../../repositories/package";
import { PayloadPackage } from "../../schemas/package";

type TPackageService = {
  add: (payload: PayloadPackage) => Promise<Packages>;
};

class PackageService implements TPackageService {
  add = async (payload: PayloadPackage) => {
    return await PackageRepo.add(payload);
  };
}

export default new PackageService();
