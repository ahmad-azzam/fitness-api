import { z } from "zod";
import { PayloadLogin } from "./login";

export const RegisterPayload = PayloadLogin.extend({
  phone: z.string().min(8),
  name: z.string().nonempty(),
});

export type RegisterPayload = z.infer<typeof RegisterPayload>;
