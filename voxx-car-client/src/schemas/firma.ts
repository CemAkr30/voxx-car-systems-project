import { z } from "zod";

export const firmaCreateSchema = z.object({
  unvan: z.string().min(1, "Firma adı gereklidir"),
});
export type CreateFirmaRequest = z.infer<typeof firmaCreateSchema>;

export const firmaUpdateSchema = firmaCreateSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Firma = z.infer<typeof firmaUpdateSchema>;
