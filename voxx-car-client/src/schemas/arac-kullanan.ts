import { CinsiyetTipi, EhliyetTipi } from "@/enums";
import { z } from "zod";

export const aracKullananCreateSchema = z.object({
	ad: z.string().min(1, "Adı gereklidir"),
	soyad: z.string().min(1, "Soyadı gereklidir"),
	email: z.string().email("Mail formatını kontrol ediniz"),
	telefonNo: z.string().min(1, "Telefon no gereklidir"),
	adres: z.string().min(1, "Adres gereklidir"),
	ehliyetNo: z.string().min(1, "Ehliyet no gereklidir"),
	ehliyetTipi: z.enum(EhliyetTipi),
	ehliyetOn: z.string(),
	ehliyetArka: z.string(),
	ehliyetBitisTarihi: z.date(),
	cinsiyetTipi: z.enum(CinsiyetTipi),
	firmaId: z.string(),
});
export type CreateAracKullananRequest = z.infer<
	typeof aracKullananCreateSchema
>;

export const aracKullananUpdateSchema = aracKullananCreateSchema.extend({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deleted: z.boolean(),
});
export type AracKullanan = z.infer<typeof aracKullananUpdateSchema>;
