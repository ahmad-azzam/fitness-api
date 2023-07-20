import { z } from "zod";
import { PayloadLogin } from "./login";

export const PayloadRegister = PayloadLogin.extend({
  phone: z.string().min(8),
  name: z.string().nonempty(),
});

export type PayloadRegister = z.infer<typeof PayloadRegister>;
