export const AdresTipiListesi = [
	"MERKEZ",
	"SUBE",
	"SHOWROOM",
	"SERVIS",
	"DEPO",
	"FATURA",
	"MUHASEBE",
	"TESLIMAT",
	"YETKILI_BAYI",
	"DIGER",
] as const;

export const AdresTipiListesiLabel = {
	MERKEZ: "Merkez",
	SUBE: "Şube",
	SHOWROOM: "Showroom",
	SERVIS: "Servis",
	DEPO: "Depo",
	FATURA: "Fatura",
	MUHASEBE: "Muhasebe",
	TESLIMAT: "Teslimat",
	YETKILI_BAYI: "Yetkili Bayii",
	DIGER: "Diğer",
};

export type AdresTipi = (typeof AdresTipiListesi)[number];

export const EhliyetTipi = [
	"A1",
	"A2",
	"A",
	"B1",
	"B",
	"BE",
	"C1",
	"C1E",
	"C",
	"CE",
	"D1",
	"D1E",
	"D",
	"DE",
	"F",
	"G",
	"M",
] as const;

export type EhliyetTipi = (typeof EhliyetTipi)[number];

export const CinsiyetTipi = ["ERKEK", "KADIN"] as const;

export type CinsiyetTipi = (typeof CinsiyetTipi)[number];

export const HasarliParcaListesi = [
	"SAG_ON_CAMURLUK",
	"SAG_ON_KAPI",
	"SAG_ARKA_KAPI",
	"SAG_ARKA_CAMURLUK",
	"ARKA_TAMPON",
	"BAGAJ_KAPAGI",
	"TAVAN",
	"KAPUT",
	"ON_TAMPON",
	"SOL_ON_CAMURLUK",
	"SOL_ON_KAPI",
	"SOL_ARKA_KAPI",
	"SOL_ARKA_CAMURLUK",
	"GENEL",
] as const;

export const HasarliParcaListesiLabel = {
	SAG_ON_CAMURLUK: "Sağ Ön Çamurluk",
	SAG_ON_KAPI: "Sağ Ön Kapı",
	SAG_ARKA_KAPI: "Sağ Arka Kapı",
	SAG_ARKA_CAMURLUK: "Sağ Arka Çamurluk",
	ARKA_TAMPON: "Arka Tampon",
	BAGAJ_KAPAGI: "Bagaj Kapağı",
	TAVAN: "Tavan",
	KAPUT: "Kaput",
	ON_TAMPON: "Ön Tampon",
	SOL_ON_CAMURLUK: "Sol Ön Çamurluk",
	SOL_ON_KAPI: "Sol Ön Kapı",
	SOL_ARKA_KAPI: "Sol Arka Kapı",
	SOL_ARKA_CAMURLUK: "Sol Arka Çamurluk",
	GENEL: "Genel",
};

export type HasarliParca = (typeof HasarliParcaListesi)[number];

export const HasarTipiListesi = [
	"ORIJINAL",
	"LOKALBOYALI",
	"BOYALI",
	"DEGISEN",
	"NotSet",
] as const;

export const HasarTipiListesiLabel = {
	ORIJINAL: "Orijinal",
	LOKALBOYALI: "Lokal Boyalı",
	BOYALI: "Boyalı",
	DEGISEN: "Değişen",
	NotSet: "Henüz Seçilmedi",
};

export type HasarTipi = (typeof HasarTipiListesi)[number];

export const SigortaTipiListesi = ["KASKO", "TRAFIK"] as const;

export const SigortaTipiListesiLabel = {
	KASKO: "Kasko",
	TRAFIK: "Trafik",
};

export type SigortaTipi = (typeof SigortaTipiListesi)[number];

export const OdemeTipiListesi = [
	"AMERICAN_EXPRESS",
	"NAKIT",
	"BANKA_EFT",
	"CARI_HESAP",
	"BANKA_HAVALE",
	"IKRAM",
	"MASTERCARD",
	"VOUCHER",
	"VISA",
	"ODENMEDI",
] as const;

export const OdemeTipiListesiLabel = {
	AMERICAN_EXPRESS: "American Express",
	NAKIT: "Nakit",
	BANKA_EFT: "Banka EFT",
	CARI_HESAP: "Cari Hesap",
	BANKA_HAVALE: "Banka Havale",
	IKRAM: "İkram",
	MASTERCARD: "Mastercard",
	VOUCHER: "Voucher",
	VISA: "Visa",
	ODENMEDI: "-",
};

export type OdemeTipi = (typeof OdemeTipiListesi)[number];

export const MuayeneTipiListesi = ["EGZOS", "FENNI"] as const;

export const MuayeneTipiListesiLabel = {
	EGZOS: "Egzos",
	FENNI: "Fenni",
};

export type MuayeneTipi = (typeof MuayeneTipiListesi)[number];

export const BakimNedeniTipiListesi = ["YILLIK", "HASAR"] as const;

export const BakimNedeniTipiListesiLabel = {
	YILLIK: "Yıllık / Periyodik",
	HASAR: "Hasar / Arıza",
};

export type BakimNedeniTipi = (typeof BakimNedeniTipiListesi)[number];

export const ParaBirimiTipiListesi = [
	"USD",
	"EUR",
	"GBP",
	"JPY",
	"TRY",
	"AUD",
	"CAD",
	"CHF",
	"CNY",
	"INR",
] as const;

export const ParaBirimiTipiListesiLabel = {
	USD: "USD",
	EUR: "EUR",
	GBP: "GBP",
	JPY: "JPY",
	TRY: "TRY",
	AUD: "AUD",
	CAD: "CAD",
	CHF: "CHF",
	CNY: "CNY",
	INR: "INR",
};

export type ParaBirimiTipi = (typeof ParaBirimiTipiListesi)[number];

export const OnarimDurumuTipiListesi = [
	"SERVISE_BEKLENIYOR",
	"EKSPER_BEKLENIYOR",
	"ONARIM_BEKLENIYOR",
	"PARCA_BEKLENIYOR",
	"KAPORTADA",
	"BOYADA",
	"MEKANIKTE",
	"TESLIME_HAZIR",
	"TESLIM_EDILDI",
] as const;

export const OnarimDurumuTipiListesiLabel = {
	SERVISE_BEKLENIYOR: "Servise Bekleniyor",
	EKSPER_BEKLENIYOR: "Eksper Bekleniyor",
	ONARIM_BEKLENIYOR: "Onarım Bekleniyor",
	PARCA_BEKLENIYOR: "Parça Bekleniyor",
	KAPORTADA: "Kaportada",
	BOYADA: "Boyada",
	MEKANIKTE: "Mekanikte",
	TESLIME_HAZIR: "Teslime Hazır",
	TESLIM_EDILDI: "Teslim Edildi",
};

export type OnarimDurumuTipi = (typeof OnarimDurumuTipiListesi)[number];

export const FilodanCikisNedeniListesi = [
	"SATIS",
	"PERT",
	"CALINTI",
	"GALERI",
	"GECICI",
	"PLAKADEGISIKLIK",
	"DIGER",
] as const;

export const FilodanCikisNedeniListesiLabel = {
	SATIS: "Satış",
	PERT: "Pert",
	CALINTI: "Çalıntı",
	GALERI: "Galeri",
	GECICI: "Geçici",
	PLAKADEGISIKLIK: "Plaka Değişiklik",
	DIGER: "Diğer",
};

export type FilodanCikisNedeni = (typeof FilodanCikisNedeniListesi)[number];

export const IletisimTipiListesi = [
	"TELEFON",
	"CEP_TELEFONU",
	"FAKS",
	"E_POSTA",
	"WEB_SITESI",
	"WHATSAPP",
	"LINKEDIN",
	"INSTAGRAM",
	"FACEBOOK",
	"TWITTER",
	"DIGER",
] as const;

export const IletisimTipiListesiLabel = {
	TELEFON: "Telefon",
	CEP_TELEFONU: "Cep Telefonu",
	FAKS: "Faks",
	E_POSTA: "E posta",
	WEB_SITESI: "Web Sitesi",
	WHATSAPP: "Whatsapp",
	LINKEDIN: "LinkedIn",
	INSTAGRAM: "İnstagram",
	FACEBOOK: "Facebook",
	TWITTER: "X",
	DIGER: "Diğer",
};

export type IletisimTipi = (typeof IletisimTipiListesi)[number];

export const AracSegmentListesi = ["A", "B", "C", "D", "E"] as const;

export const AracSegmentListesiLabel = {
	A: "A Segment (Mini sınıf)",
	B: "B Segment (Küçük sınıf)",
	C: "C Segment (Kompakt sınıf)",
	D: "D Segment (Orta sınıf)",
	E: "E Segment (Üst-orta sınıf)",
	F: "F Segment (Lüks sınıf)",
};

export const AracSegmentListesiYardımMetni = {
	A: "En küçük araçlardır. Şehir içi kullanım, kolay park ve düşük yakıt tüketimi için idealdir. \n Örnek: Fiat 500, Hyundai i10.",
	B: "A’ya göre daha geniş ve kullanışlıdır. Hem şehir içi hem kısa mesafe yolculuklar için uygundur. \n Örnek: Renault Clio, Ford Fiesta",
	C: "Türkiye’de en çok tercih edilen sınıftır. Aile kullanımına uygundur, geniş iç hacim sunar. \n Örnek: VW Golf, Toyota Corolla, Renault Megane",
	D: "Daha büyük, konforlu ve güçlüdür. Uzun yolculuklar için idealdir. \n Örnek: VW Passat, BMW 3 Serisi, Mercedes C Serisi",
	E: "Daha prestijli, geniş ve lüks seçenekler sunar. Genellikle üst düzey yöneticiler tercih eder. \n Örnek: BMW 5 Serisi, Mercedes E Serisi, Audi A6",
	F: "En üst düzey konfor, teknoloji ve prestiji sunar. Genellikle makam aracı olarak kullanılır. \n Mercedes S Serisi, BMW 7 Serisi, Audi A8",
};

export type AracSegmentTipi = (typeof AracSegmentListesi)[number];

export const KasaTipiListesi = [
	"SEDAN",
	"HATCHBACK",
	"STATION_WAGON",
	"SUV",
	"CROSSOVER",
	"COUPE",
	"CABRIO",
	"MPV",
	"PICKUP",
	"VAN",
] as const;

export const KasaTipiListesiLabel = {
	SEDAN: "Sedan",
	HATCHBACK: "Hatchback",
	STATION_WAGON: "Station Vagon",
	SUV: "SUV",
	CROSSOVER: "Crossover",
	COUPE: "Coupe",
	CABRIO: "Cabrio",
	MPV: "MPV",
	PICKUP: "Pickup",
	VAN: "Van",
};

export type KasaTipi = (typeof KasaTipiListesi)[number];

export const OdemeYapanFirmaListesi = [
	"VOXX",
	"FORS",
	"EYLUL",
	"MOTION",
	"HASA",
	"DEFAULT",
] as const;

export const OdemeYapanFirmaListesiLabel = {
	VOXX: "Voxx Loj. Dış Tic. Ltd. Şti.",
	FORS: "Fors Loj. Taş. Hizm. Mak. San. ve Tic. Ltd. Şti.",
	EYLUL: "Eylül Loj. A.Ş.",
	MOTION: "Motion Loj. A.Ş.",
	HASA: "Has Aydınlar Mot. Taş. A.Ş.",
	DEFAULT: "-",
};

export type OdemeYapanFirma = (typeof OdemeYapanFirmaListesi)[number];

export const KazaNedeniListesi = [
	"HASAR_IHBARI",
	"CARPMA_CARPISMA",
	"HIRSIZLIK_ARAC_IC_ARAC",
	"ANAHTAR_KAYBI",
	"ARACIN_YANMASI",
	"ARACA_UCUNCU_KISILERCE_ZARAR_VERILMESI",
	"CAM_FAR_KIRILMASI",
	"DOGAL_AFET_HASARI",
	"DIGER",
] as const;

export const KazaNedeniListesiLabel = {
	HASAR_IHBARI: "Hasar İhbarı",
	CARPMA_CARPISMA: "Çarpma/Çarpışma",
	HIRSIZLIK_ARAC_IC_ARAC: "Hırsızlık/Araç İçi Araç",
	ANAHTAR_KAYBI: "Anahtar Kaybı",
	ARACIN_YANMASI: "Aracın Yanması",
	ARACA_UCUNCU_KISILERCE_ZARAR_VERILMESI:
		"Araca Üçüncü Kişilerce Zarar Verilmesi",
	CAM_FAR_KIRILMASI: "Cam/Far Kırılması",
	DOGAL_AFET_HASARI: "Doğal Afet Hasarı",
	DIGER: "Diğer",
};

export type KazaNedeni = (typeof KazaNedeniListesi)[number];
