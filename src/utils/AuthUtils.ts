import bcrypt, { hash } from "bcrypt";

class AuthUtils {
  public static passwordHash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  };

  public static passwordCompare = async (
    password: string,
    encryptedPassword: string
  ) => {
    return await bcrypt.compare(password, encryptedPassword);
  };
}

export default AuthUtils;
