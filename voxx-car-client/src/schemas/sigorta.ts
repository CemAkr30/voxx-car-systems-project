import { SigortaTipiListesi } from "@/enums";
import { z } from "zod";

export const sigortaCreateSchema = z.object({
	aracFiloId: z.string().min(1, "Firma gereklidir"),
	tip: z.enum(SigortaTipiListesi),
	sigortaSirketi: z.string().min(1, "Sigortayı yapan firma gereklidir"),
	acente: z.string().min(1, "Acente gereklidir"),
	policeNo: z.string().min(1, "Poliçe no gereklidir"),
	baslangicTarihi: z.date(),
	bitisTarihi: z.date(),
});
export type CreateSigortaRequest = z.infer<typeof sigortaCreateSchema>;

export const sigortaUpdateSchema = sigortaCreateSchema.extend({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	isDeleted: z.boolean(),
});
export type Sigorta = z.infer<typeof sigortaUpdateSchema>;
