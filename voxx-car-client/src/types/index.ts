import { z } from "zod";

export const brandFormCreateSchema = z.object({
  adi: z.string().min(3, { message: "Marka adı 3 karakterden az olmamalıdır" }),
});
export type BrandFormCreateDTO = z.infer<typeof brandFormCreateSchema>;

export const brandFormUpdateSchema = brandFormCreateSchema.extend({
  id: z.number().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});
export type BrandFormUpdateDTO = z.infer<typeof brandFormUpdateSchema>;
