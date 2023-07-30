import Packages from "../../models/packages";
import { PayloadPackage } from "../../schemas/package";

type TPackageRepo = {
  create: (packages: PayloadPackage) => Promise<Packages>;
  findAll: () => Promise<Packages[]>;
  findByPk: (id: string) => Promise<Packages | null>;
  update: (
    payload: PayloadPackage,
    id: string
  ) => Promise<[affectedCount: number, affectedRows: Packages[]]>;
  destroy: (id: string) => Promise<number>;
};

class PackageRepo implements TPackageRepo {
  create = async (packages: PayloadPackage) => {
    return await Packages.create(packages);
  };

  findAll = async () => {
    return await Packages.findAll();
  };

  findByPk = async (id: string) => {
    return await Packages.findByPk(id);
  };

  update = async (payload: PayloadPackage, id: string) => {
    return await Packages.update(payload, { where: { id }, returning: true });
  };

  destroy = async (id: string) => {
    return await Packages.destroy({ where: { id } });
  };
}

export default new PackageRepo();
