import { FilodanCikisNedeniListesi } from "@/enums";
import { z } from "zod";

export const filodanCikisCreateSchema = z.object({
	aracFiloId: z.string(),
	filodanCikisNedeni: z.enum(FilodanCikisNedeniListesi),
	filodanCikisTarihi: z.date(),
	alici: z.string(),
	anahtarTeslimFiyati: z.coerce.number(),
	aracDevirGiderleri: z.coerce.number(),
	faturaYukle: z.string(),
	aciklama: z.string(),
});
export type CreateFilodanCikisRequest = z.infer<
	typeof filodanCikisCreateSchema
>;

export const filodanCikisUpdateSchema = filodanCikisCreateSchema.extend({
	id: z.string(),
});
export type FilodanCikis = z.infer<typeof filodanCikisUpdateSchema>;
