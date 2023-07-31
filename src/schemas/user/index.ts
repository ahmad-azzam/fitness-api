import { z } from "zod";
import { EUserType } from "../auth/register";

export const UserInfo = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  type: z.nativeEnum(EUserType),
  userInfo: z.unknown(),
});

export type UserInfo = z.infer<typeof UserInfo>;
