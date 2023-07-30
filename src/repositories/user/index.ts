import Users from "../../models/users";
import { PayloadRegister } from "../../schemas/auth/register";
import { FindOptions, InferAttributes } from "sequelize";

type TUserRepo = {
  create: (users: PayloadRegister) => Promise<Users>;
  findOne: (
    option: FindOptions<
      InferAttributes<
        Users,
        {
          omit: never;
        }
      >
    >
  ) => Promise<Users | null>;
};

class UserRepo implements TUserRepo {
  create = async (users: PayloadRegister) => {
    return await Users.create(users);
  };

  findOne = async (
    options: FindOptions<
      InferAttributes<
        Users,
        {
          omit: never;
        }
      >
    >
  ) => {
    return await Users.findOne(options);
  };
}

export default new UserRepo();
