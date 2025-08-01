import { z } from "zod";

export const aracFiloCreateSchema = z.object({
	plaka: z.string().min(1, "Lütfen plaka bilgisini giriniz."),
	markaId: z.string().min(1, "Lütfen bir marka seçiniz."),
	modelId: z.string().min(1, "Lütfen bir model seçiniz."),
	modelYili: z.string().min(1, "Lütfen model yılını giriniz."),
	aracTipi: z.string().min(1, "Lütfen araç tipini giriniz."),
	segment: z.string().min(1, "Lütfen segment bilgisi giriniz."),
	motorNo: z.string().min(1, "Lütfen motor numarasını giriniz."),
	sasiNo: z.string().min(1, "Lütfen şasi numarasını giriniz."),
	renk: z.string().min(1, "Lütfen araç rengini giriniz."),
	kasaTipi: z.string().min(1, "Lütfen kasa tipini giriniz."),
	lastikTipi: z.string().min(1, "Lütfen lastik tipini giriniz."),
	filoyaGirisTarihi: z.date(),
	filoyaGirisKm: z.string().min(1, "Lütfen giriş kilometresini giriniz."),
	tescilTarihi: z.date(),
	trafigeCikisTarihi: z.date(),
	garantisiVarMi: z.boolean(),
	garantiBitisTarihi: z.date(),
	garantiSuresiYil: z
		.string()
		.min(1, "Lütfen garanti süresini yıl olarak giriniz."),
	garantiKm: z.string().min(1, "Lütfen garanti kilometresi giriniz."),
	tramer: z.boolean(),
	tramerTutari: z.coerce.number(),
	sonKmTarihi: z.date(),
	sonKm: z.string().min(1, "Lütfen son kilometreyi giriniz."),
	sonYakitMiktari: z.string().min(1, "Lütfen son yakıt miktarını giriniz."),
	kiralandiMi: z.boolean(),
	kiralandigiTarih: z.date(),
	kontratSuresi: z.string().min(1, "Lütfen kontrat süresini giriniz."),
	kiralikBitisTarihi: z.date(),
	kiralayanFirmaId: z.string().min(1, "Lütfen kiraya veren firmayı seçiniz."),
	filoDurum: z.coerce.number(),
});

export type CreateAracFiloRequest = z.input<typeof aracFiloCreateSchema>;

export const aracFiloUpdateSchema = aracFiloCreateSchema.extend({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deleted: z.boolean(),
});

export type AracFilo = z.input<typeof aracFiloUpdateSchema>;
