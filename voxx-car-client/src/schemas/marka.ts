import { z } from "zod";

export const markaCreateSchema = z.object({
	adi: z.string().min(1, "Marka adı gereklidir"),
});
export type CreateMarkaRequest = z.input<typeof markaCreateSchema>;

export const markaUpdateSchema = markaCreateSchema.extend({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	isDeleted: z.boolean(),
});
export type Marka = z.input<typeof markaUpdateSchema>;
