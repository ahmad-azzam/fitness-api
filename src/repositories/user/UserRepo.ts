import Users from "../../models/users";
import { RegisterPayload } from "../../schemas/auth/register";

type TUserRepo = {
  add: (users: RegisterPayload) => Promise<Users | unknown>;
};

class UserRepo implements TUserRepo {
  add = async (users: RegisterPayload) => {
    return await Users.create(users);
  };
}

export default new UserRepo();
