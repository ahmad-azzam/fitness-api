import { z } from "zod";

export const PayloadLogin = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type PayloadLogin = z.infer<typeof PayloadLogin>;
