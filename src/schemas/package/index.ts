import { z } from "zod";

export const PayloadPackage = z.object({
  type: z.string().nonempty(),
  price: z.number().int(),
});

export type PayloadPackage = z.infer<typeof PayloadPackage>;
