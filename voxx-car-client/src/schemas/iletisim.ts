import { IletisimTipiListesi } from "@/enums";
import { z } from "zod";

export const iletisimCreateSchema = z.object({
	numara: z.string().min(1, "Iletisim adı gereklidir"),
	firmaId: z.string().min(1, "Firma gereklidir"),
	tip: z.enum(IletisimTipiListesi),
});
export type CreateIletisimRequest = z.infer<typeof iletisimCreateSchema>;

export const iletisimUpdateSchema = iletisimCreateSchema.extend({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deleted: z.boolean(),
});
export type Iletisim = z.infer<typeof iletisimUpdateSchema>;
