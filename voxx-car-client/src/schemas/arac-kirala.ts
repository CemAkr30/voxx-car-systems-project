import { z } from "zod";

export const aracKiralaCreateSchema = z.object({
	aracFiloId: z.string(),
	firmaId: z.string(),
	sozlesmeBaslangicTarihi: z.date(),
	sozlesmeBitisTarihi: z.date(),
	teslimatTutanagi: z.string().optional(), // Base64 formatında teslimat tutanağı dosyası
	sozlesme: z.string().optional(), // Base64 formatında sözleşme dosyası
	odemeVadesi: z.coerce.number().optional(), // Ödeme vadesi (gün)
});
export type CreateAracKiralaRequest = z.infer<typeof aracKiralaCreateSchema>;

export const aracKiralaUpdateSchema = aracKiralaCreateSchema.extend({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deleted: z.boolean(),
});
export type AracKirala = z.infer<typeof aracKiralaUpdateSchema>;
