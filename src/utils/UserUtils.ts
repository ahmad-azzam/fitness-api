import PersonalTrainers from "../models/personalTrainers";
import Users from "../models/users";
import { EUserType } from "../schemas/auth/register";

class UserUtils {
  public static getInfo = (
    user: Users | null
  ): PersonalTrainers | null | unknown => {
    if (!user) return null;

    switch (user.get("type")) {
      case EUserType.PT:
        return user.get("personalTrainer");

      case EUserType.MEMBER:
        return user.get("members");

      default:
        return user.get("members");
    }
  };
}

export default UserUtils;
