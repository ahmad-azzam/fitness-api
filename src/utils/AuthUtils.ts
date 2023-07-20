import bcrypt, { hash } from "bcrypt";
import { UserInfo } from "../schemas/user";
import jwt from "jsonwebtoken";

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

  public static generateToken = (payload: UserInfo) => {
    const secretKey = process.env.JWT_SECRET_KEY as string;
    return jwt.sign(payload, secretKey);
  };

  public static validateToken = (token: string) => {
    const secretKey = process.env.JWT_SECRET_KEY as string;
    return jwt.verify(token, secretKey);
  };
}

export default AuthUtils;
