import Packages from "../../models/packages";
import PackageRepo from "../../repositories/package";
import { PayloadPackage } from "../../schemas/package";

type TPackageService = {
  add: (payload: PayloadPackage) => Promise<Packages>;
  edit: (
    payload: PayloadPackage,
    id: string
  ) => Promise<[affectedCount: number, affectedRows: Packages[]]>;
  getAll: () => Promise<Packages[]>;
  getById: (id: string) => Promise<Packages | null>;
  destroy: (id: string) => Promise<number>;
};

class PackageService implements TPackageService {
  add = async (payload: PayloadPackage) => {
    return await PackageRepo.create(payload);
  };

  edit = async (payload: PayloadPackage, id: string) => {
    return PackageRepo.update(payload, id);
  };

  getAll = async () => {
    return await PackageRepo.findAll();
  };

  getById = async (id: string) => {
    return await PackageRepo.findByPk(id);
  };

  destroy = async (id: string) => {
    return await PackageRepo.destroy(id);
  };
}

export default new PackageService();
