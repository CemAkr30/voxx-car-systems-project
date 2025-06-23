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
