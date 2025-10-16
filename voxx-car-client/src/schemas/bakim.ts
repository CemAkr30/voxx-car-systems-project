import { z } from "zod";
import { BakimNedeniTipiListesi, OdemeYapanFirmaListesi } from "@/enums";

export const bakimCreateSchema = z.object({
	aracFiloId: z.string(),
	bakimNedeni: z.enum(BakimNedeniTipiListesi, {
		errorMap: () => ({ message: "Bakım Nedeni gereklidir" }),
	}),
	parca: z.string().min(1, "Bakım yapılan parca gereklidir"),
	parcaTutari: z.coerce.number(),
	parcaAdedi: z.coerce.number(),
	iscilikTutari: z.coerce.number(),
	faturaNo: z.string().min(1, "Fatura no gereklidir"),
	fatura: z.string().min(1, "Fatura yüklemek gereklidir"),
	aciklama: z.string(),
	bakimOdeyenFirma: z.enum(OdemeYapanFirmaListesi, {
		errorMap: () => ({ message: "Ödeme Yapan Firma gereklidir" }),
	}),
	bakimAraligi: z.coerce.number(),
});
export type CreateBakimRequest = z.infer<typeof bakimCreateSchema>;

export const bakimUpdateSchema = bakimCreateSchema.extend({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deleted: z.boolean(),
});
export type Bakim = z.infer<typeof bakimUpdateSchema>;
