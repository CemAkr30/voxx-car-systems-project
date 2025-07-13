export const AdresTipi = [
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

export type AdresTipi = (typeof AdresTipi)[number];

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
	ODENMEDI: "Ödenmedi",
};

export type OdemeTipi = (typeof OdemeTipiListesi)[number];
