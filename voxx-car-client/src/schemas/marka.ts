import { z } from "zod";

export const markaCreateSchema = z.object({
  adi: z.string().min(1, "Marka adı gereklidir"),
});
export type CreateMarkaRequest = z.infer<typeof markaCreateSchema>;

export const markaUpdateSchema = markaCreateSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Marka = z.infer<typeof markaUpdateSchema>;
