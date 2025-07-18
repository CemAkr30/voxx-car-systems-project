import { MuayeneTipiListesi, OdemeTipiListesi } from "@/enums";
import { z } from "zod";

export const muayeneCreateSchema = z.object({
	aracFiloId: z.string(),
	muayeneTipi: z.enum(MuayeneTipiListesi),
	makbuzNo: z.string(),
	odeyenFirmaId: z.string(),
	miktar: z.coerce.number(),
	odemeTipi: z.enum(OdemeTipiListesi),
	aciklama: z.string(),
	yeri: z.string(),
	gecikmeCezasi: z.string(),
	odendi: z.boolean().default(false),
	baslangicTarihi: z.date(),
	bitisTarihi: z.date(),
});
export type CreateMuayeneRequest = z.infer<typeof muayeneCreateSchema>;

export const muayeneUpdateSchema = muayeneCreateSchema.extend({
	id: z.string(),
});
export type Muayene = z.infer<typeof muayeneUpdateSchema>;
