import Users from "../../models/users";
import UserRepo from "../../repositories/user/UserRepo";
import { RegisterPayload } from "../../schemas/auth/register";

type TAuthService = {
  // login: (payloadLogin: PayloadLogin) => Promise<string | unknown>;

  register: (payloadRegister: RegisterPayload) => Promise<Users | unknown>;
};

class AuthService implements TAuthService {
  register = async (payload: RegisterPayload) => {
    return await UserRepo.add(payload);
  };
}

export default new AuthService();
