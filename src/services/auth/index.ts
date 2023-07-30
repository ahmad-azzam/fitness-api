import { Response } from "express";
import Users from "../../models/users";
import UserRepo from "../../repositories/user";
import { PayloadLogin } from "../../schemas/auth/login";
import { PayloadRegister } from "../../schemas/auth/register";
import AuthUtils from "../../utils/AuthUtils";
import CookieService from "../cookie";
import PersonalTrainerService from "../../services/personalTrainers";

type TAuthService = {
  login: (payloadLogin: PayloadLogin, res: Response) => Promise<any>;

  register: (payloadRegister: PayloadRegister) => Promise<any>;
};

class AuthService implements TAuthService {
  register = async (payload: PayloadRegister) => {
    console.log(payload);
    const createUser = await UserRepo.create(payload);

    if (createUser) {
      switch (payload.type) {
        case "PT":
          return await PersonalTrainerService.create({
            memberId: null,
            price: null,
            userId: createUser.get("id"),
          });

        default:
          return "";
      }
    }
  };

  login = async ({ email, password }: PayloadLogin, res: Response) => {
    const getUser = await UserRepo.findOne({ where: { email } });

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
