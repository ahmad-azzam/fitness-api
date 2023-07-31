import { z } from "zod";

export const PayloadPersonalTrainer = z.object({
  userId: z.string(),
  memberId: z.string().nullable(),
  price: z.number().int().nullable(),
});

export type PayloadPersonalTrainer = z.infer<typeof PayloadPersonalTrainer>;
