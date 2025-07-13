import { OdemeTipiListesi } from "@/enums";
import { z } from "zod";

export const mtvCreateSchema = z.object({
	aracFiloId: z.string(),
	yil: z.string().min(1, "Yıl gereklidir"),
	taksit: z.string().min(1, "Taksit gereklidir"),
	makbuzNo: z.string().min(1, "Makbuz no gereklidir"),
	miktar: z.coerce.number(),
	odemeTipi: z.enum(OdemeTipiListesi),
	odeyenFirmaId: z.string(),
	not: z.string(),
	gecikmeCezasi: z.string(),
	odendi: z.boolean().default(false),
});
export type CreateMtvRequest = z.infer<typeof mtvCreateSchema>;

export const mtvUpdateSchema = mtvCreateSchema.extend({
	id: z.string(),
});
export type Mtv = z.infer<typeof mtvUpdateSchema>;
