import { HasarliParcaListesi, HasarTipiListesi } from "@/enums";
import { z } from "zod";

export const hasarCreateSchema = z.object({
	aracFiloId: z.string(),
	hasarTipi: z.enum(HasarTipiListesi),
	hasarliParca: z.enum(HasarliParcaListesi),
});
export type CreateHasarRequest = z.input<typeof hasarCreateSchema>;

export const hasarUpdateSchema = hasarCreateSchema.extend({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});
export type Hasar = z.input<typeof hasarUpdateSchema>;
