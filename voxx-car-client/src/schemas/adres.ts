import { AdresTipiListesi } from "@/enums";
import { z } from "zod";

export const adresCreateSchema = z.object({
	aciklama: z.string().min(1, "Adres adı gereklidir"),
	firmaId: z.string().min(1, "Firma gereklidir"),
	tip: z.enum(AdresTipiListesi),
});
export type CreateAdresRequest = z.infer<typeof adresCreateSchema>;

export const adresUpdateSchema = adresCreateSchema.extend({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});
export type Adres = z.infer<typeof adresUpdateSchema>;
