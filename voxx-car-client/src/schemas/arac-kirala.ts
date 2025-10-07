import { z } from "zod";

export const aracKiralaCreateSchema = z.object({
	firmaId: z.string(),
	aracFiloId: z.string(),
	baslangicTarihi: z.date(),
	bitisTarihi: z.date(),
	sozlesmeTutari: z.coerce.number(),
	aylikFaturaTutari: z.coerce.number(),
	kapora: z.coerce.number(),
});
export type CreateAracKiralaRequest = z.infer<typeof aracKiralaCreateSchema>;

export const aracKiralaUpdateSchema = aracKiralaCreateSchema.extend({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deleted: z.boolean(),
});
export type AracKirala = z.infer<typeof aracKiralaUpdateSchema>;
