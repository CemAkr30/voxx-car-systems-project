import { z } from "zod";
import { KazaNedeniListesi, OnarimDurumuTipiListesi } from "@/enums";

export const kazaCreateSchema = z.object({
	aracFiloId: z.string(),
	firmaId: z.string(),
	kazaTarihi: z.date(),
	kazaIli: z.string(),
	kazaNedeni: z.enum(KazaNedeniListesi),
	kazaTutanagi: z.string().optional(), // Base64 formatında kaza tutanağı dosyası
	onarimDurumu: z.enum(OnarimDurumuTipiListesi),
	odeyenFirmaId: z.string(),
});

export type CreateKazaRequest = z.infer<typeof kazaCreateSchema>;

export const kazaUpdateSchema = kazaCreateSchema.extend({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deleted: z.boolean(),
});
export type Kaza = z.infer<typeof kazaUpdateSchema>;
