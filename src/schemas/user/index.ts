import { z } from "zod";

export const UserInfo = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});

export type UserInfo = z.infer<typeof UserInfo>;
