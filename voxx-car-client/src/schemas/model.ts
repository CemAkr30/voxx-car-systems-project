import { z } from "zod";

export const modelCreateSchema = z.object({
	adi: z.string().min(1, "Model adı gereklidir"),
	markaId: z.string().min(1, "Marka adı gereklidir"),
});
export type CreateModelRequest = z.infer<typeof modelCreateSchema>;

export const modelUpdateSchema = modelCreateSchema.extend({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});
export type Model = z.infer<typeof modelUpdateSchema>;
