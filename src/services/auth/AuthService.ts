import Users from "../../models/users";
import UserRepo from "../../repositories/user/UserRepo";
import { PayloadLogin } from "../../schemas/auth/login";
import { PayloadRegister } from "../../schemas/auth/register";
import AuthUtils from "../../utils/AuthUtils";

type TAuthService = {
  login: (payloadLogin: PayloadLogin) => Promise<string>;

  register: (payloadRegister: PayloadRegister) => Promise<Users>;
};

class AuthService implements TAuthService {
  register = async (payload: PayloadRegister) => {
    return await UserRepo.add(payload);
  };

  login = async ({ email, password }: PayloadLogin) => {
    const getUser = await UserRepo.findByEmail(email);

    if (!getUser)
      throw { name: "Bad Request", messages: "Email or password is wrong" };

    const checkPassword = await AuthUtils.passwordCompare(
      password,
      getUser.password
    );

    if (!checkPassword)
      throw { name: "Bad Request", messages: "Email or password is wrong" };

    const { email: userEmail, id, name, phone } = getUser;

    return AuthUtils.generateToken({ email: userEmail, id, name, phone });
  };
}

export default new AuthService();
