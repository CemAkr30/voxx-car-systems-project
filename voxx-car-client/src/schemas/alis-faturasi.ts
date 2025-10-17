import { z } from "zod";
import { ParaBirimiTipiListesi } from "@/enums";

export const alisFaturasiCreateSchema = z.object({
	aracFiloId: z.string(),
	alisFaturasiTarihi: z.date(),
	saticiFirmaId: z.string().min(1, "Firma gereklidir"),
	listeFiyati: z.coerce.number(),
	ekGaranti: z.coerce.number(),
	malDegeri: z.coerce.number(),
	iskonto: z.coerce.number(),
	nakliyeBedeli: z.coerce.number(),
	otvMatrah: z.coerce.number(),
	otv: z.coerce.number(),
	otvIndirimi: z.coerce.number(),
	kdv: z.coerce.number(),
	faturaToplam: z.coerce.number(),
	paraBirimi: z.enum(ParaBirimiTipiListesi),
	gecikmeCezasi: z.string(),
	kur: z.coerce.number(),
	faturaTry: z.coerce.number(),
	faturaYukle: z.string().optional(), // Base64 formatında fatura dosyası
	aciklama: z.string(),
});
export type CreateAlisFaturasiRequest = z.infer<
	typeof alisFaturasiCreateSchema
>;

export const alisFaturasiUpdateSchema = alisFaturasiCreateSchema.extend({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deleted: z.boolean(),
});
export type AlisFaturasi = z.infer<typeof alisFaturasiUpdateSchema>;
