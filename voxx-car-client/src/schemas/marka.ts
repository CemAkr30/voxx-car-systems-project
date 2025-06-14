import { z } from "zod";

export const markaCreateSchema = z.object({
  adi: z.string().min(1, "Marka adı gereklidir"),
});
export type CreateMarkaRequest = z.infer<typeof markaCreateSchema>;

export const markaUpdateSchema = markaCreateSchema.extend({
  id: z.number().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional(),
});
export type UpdateMarkaRequest = z.infer<typeof markaUpdateSchema>;

export type Marka = z.infer<typeof markaUpdateSchema>;
