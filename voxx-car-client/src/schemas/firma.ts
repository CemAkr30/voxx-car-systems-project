import { z } from "zod";

export const firmaCreateSchema = z.object({
	unvan: z.string().min(1, "Firma adı gereklidir"),
	email: z.string().email("Mail formatını kontrol ediniz"),
	vergiNo: z.string().min(1, "Vergi no gereklidir"),
});
export type CreateFirmaRequest = z.infer<typeof firmaCreateSchema>;

export const firmaUpdateSchema = firmaCreateSchema.extend({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deleted: z.boolean(),
});
export type Firma = z.infer<typeof firmaUpdateSchema>;

export const firmaDokumanEkleSchema = z.object({
	firmaId: z.string().min(1, "Firma ID gereklidir"),
	sozlesme: z.string().min(1, "Sözleşme metni gereklidir"),
});
export type FirmaDokumanEkleRequest = z.infer<typeof firmaDokumanEkleSchema>;

export const firmaDokumanSchema = z.object({
	id: z.string(),
	firmaId: z.string(),
	sozlesme: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	isDeleted: z.boolean(),
});
export type FirmaDokuman = z.infer<typeof firmaDokumanSchema>;