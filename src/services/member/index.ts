import Members from "../../models/members";
import Packages from "../../models/packages";
import PersonalTrainers from "../../models/personalTrainers";
import { PayloadMember } from "../../schemas/member";

type TMemberService = {
  create: (payload: PayloadMember) => Promise<Members>;
  managePersonalTrainer: (
    userId: string,
    personalTrainerId: string | null
  ) => Promise<[affectedCount: number]>;
  getOne: (id: string) => Promise<Members | null>;
  getByUserId: (userId: string) => Promise<Members | null>;
};

class MemberService implements TMemberService {
  create = async (payload: PayloadMember) => {
    return await Members.create(payload);
  };

  getOne = async (id: string) => {
    return await Members.findByPk(id, {
      include: [
        { model: PersonalTrainers, as: "personalTrainer" },
        { model: Packages, as: "package" },
      ],
      attributes: {
        exclude: [
          "id",
          "userId",
          "personalTrainerId",
          "packageId",
          "createdAt",
          "updatedAt",
        ],
      },
    });
  };

  getByUserId = async (userId: string) => {
    return await Members.findOne({ where: { userId } });
  };

  managePersonalTrainer = async (
    id: string,
    personalTrainerId: string | null
  ) => {
    return await Members.update({ personalTrainerId }, { where: { id } });
  };
}

export default new MemberService();
