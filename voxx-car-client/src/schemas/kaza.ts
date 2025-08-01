import { z } from "zod";
import { OnarimDurumuTipiListesi } from "@/enums";

export const kazaCreateSchema = z.object({
	aracFiloId: z.string(),
	firmaId: z.string(),
	musteriId: z.string(),
	kazaTarihi: z.date(),
	kazaIli: z.string(),
	kazaNedeni: z.string(),
	kazaTutanagi: z.string(),
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
