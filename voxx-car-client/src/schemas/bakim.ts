import { z } from "zod";
import { BakimNedeniTipiListesi } from "@/enums";

export const bakimCreateSchema = z.object({
	aracFiloId: z.string(),
	bakimNedeni: z.enum(BakimNedeniTipiListesi),
	parca: z.string().min(1, "Bakım yapılan parca gereklidir"),
	parcaTutari: z.coerce.number(),
	iscilikTutari: z.coerce.number(),
	toplamTutar: z.coerce.number(),
	faturaNo: z.string().min(1, "Fatura no gereklidir"),
	fatura: z.string().min(1, "Fatura yüklemek gereklidir"),
	aciklama: z.string(),
	odeyenFirmaId: z.string().min(1, "Firma gereklidir"),
});
export type CreateBakimRequest = z.infer<typeof bakimCreateSchema>;

export const bakimUpdateSchema = bakimCreateSchema.extend({
	id: z.string(),
});
export type Bakim = z.infer<typeof bakimUpdateSchema>;
