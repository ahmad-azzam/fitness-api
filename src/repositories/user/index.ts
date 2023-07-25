import Users from "../../models/users";
import { PayloadRegister } from "../../schemas/auth/register";

type TUserRepo = {
  add: (users: PayloadRegister) => Promise<Users>;
  findByEmail: (email: string) => Promise<Users | null>;
};

class UserRepo implements TUserRepo {
  add = async (users: PayloadRegister) => {
    return await Users.create(users);
  };

  findByEmail = async (email: string) => {
    return await Users.findOne({
      where: { email },
    });
  };
}

export default new UserRepo();
