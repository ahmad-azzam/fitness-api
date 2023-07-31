import Packages from "../../models/packages";
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
    return await Packages.create(payload);
  };

  edit = async (payload: PayloadPackage, id: string) => {
    return await Packages.update(payload, { where: { id }, returning: true });
  };

  getAll = async () => {
    return await Packages.findAll();
  };

  getById = async (id: string) => {
    return await Packages.findByPk(id);
  };

  destroy = async (id: string) => {
    return await Packages.destroy({ where: { id } });
  };
}

export default new PackageService();
