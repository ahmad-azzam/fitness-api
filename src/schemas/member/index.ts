import { z } from "zod";

export const PayloadMember = z.object({
  userId: z.string(),
  personalTrainerId: z.string().nullable(),
  packageId: z.string().nullable(),
  joinDate: z.date(),
});

export type PayloadMember = z.infer<typeof PayloadMember>;
