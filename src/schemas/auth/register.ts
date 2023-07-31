import { z } from "zod";
import { PayloadLogin } from "./login";

export enum EUserType {
  PT = "PT",
  MEMBER = "MEMBER",
}

export const PayloadRegister = PayloadLogin.extend({
  phone: z.string().min(8),
  name: z.string().nonempty(),
  type: z.nativeEnum(EUserType),
});

export type PayloadRegister = z.infer<typeof PayloadRegister>;
