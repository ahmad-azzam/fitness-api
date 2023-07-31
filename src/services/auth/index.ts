import { Response } from "express";
import Users from "../../models/users";
import { PayloadLogin } from "../../schemas/auth/login";
import { PayloadRegister } from "../../schemas/auth/register";
import AuthUtils from "../../utils/AuthUtils";
import CookieService from "../cookie";
import PersonalTrainerService from "../../services/personalTrainers";
import PersonalTrainers from "../../models/personalTrainers";
import Members from "../../models/members";
import UserUtils from "../../utils/UserUtils";

type TAuthService = {
  login: (payloadLogin: PayloadLogin, res: Response) => Promise<any>;

  register: (payloadRegister: PayloadRegister) => Promise<any>;
};

class AuthService implements TAuthService {
  register = async (payload: PayloadRegister) => {
    const createUser = await Users.create(payload);

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
    const getUser = await Users.findOne({
      where: { email },
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
        { model: Members, include: [PersonalTrainers] },
      ],
    });

    if (!getUser)
      throw { name: "Bad Request", messages: "Email or password is wrong" };

    const checkPassword = await AuthUtils.passwordCompare(
      password,
      getUser.password
    );

    if (!checkPassword)
      throw { name: "Bad Request", messages: "Email or password is wrong" };

    const { email: userEmail, id, name, phone, type } = getUser;

    const token = AuthUtils.generateToken({
      email: userEmail,
      id,
      name,
      phone,
      type,
      userInfo: UserUtils.getInfo(getUser),
    });

    const cookie = new CookieService(res);

    return cookie.setCookie({ name: "token", value: `Bearer ${token}` });
  };
}

export default new AuthService();
