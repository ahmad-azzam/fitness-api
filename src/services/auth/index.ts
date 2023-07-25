import { Response } from "express";
import Users from "../../models/users";
import UserRepo from "../../repositories/user";
import { PayloadLogin } from "../../schemas/auth/login";
import { PayloadRegister } from "../../schemas/auth/register";
import AuthUtils from "../../utils/AuthUtils";
import CookieService from "../cookie";

type TAuthService = {
  login: (payloadLogin: PayloadLogin, res: Response) => Promise<any>;

  register: (payloadRegister: PayloadRegister) => Promise<Users>;
};

class AuthService implements TAuthService {
  register = async (payload: PayloadRegister) => {
    return await UserRepo.add(payload);
  };

  login = async ({ email, password }: PayloadLogin, res: Response) => {
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

    const token = AuthUtils.generateToken({
      email: userEmail,
      id,
      name,
      phone,
    });

    const cookie = new CookieService(res);

    return cookie.setCookie({ name: "token", value: `Bearer ${token}` });
  };
}

export default new AuthService();
