import Members from "../../models/members";
import PersonalTrainers from "../../models/personalTrainers";
import Users from "../../models/users";

type TUserService = {
  getById: (id: string) => Promise<Users | null>;
};

class UserService implements TUserService {
  getById = async (id: string) => {
    return await Users.findByPk(id, {
      include: [
        {
          model: PersonalTrainers,
          include: [
            {
              model: Members,
              as: "members",
            },
          ],
          as: "personalTrainer",
          attributes: {
            exclude: ["memberId", "createdAt", "updatedAt", "userId", "id"],
          },
        },
        {
          model: Members,
          include: [{ model: PersonalTrainers, as: "personalTrainer" }],
          as: "members",
        },
      ],
    });
  };
}

export default new UserService();
