import { z } from "zod";

export const PayloadPersonalTrainer = z.object({
  userId: z.number().int(),
  memberId: z.number().int().nullable(),
  price: z.number().int().nullable(),
});

export type PayloadPersonalTrainer = z.infer<typeof PayloadPersonalTrainer>;
