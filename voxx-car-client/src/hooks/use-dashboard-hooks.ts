import {
	getMTVDurum,
	getMuayeneDurum,
	getSigortaDurum,
	getFiloDurum,
	getFirmaAracSayisi,
	getKiralananAraclar,
	type MTVDurumResponse,
	type MuayeneDurumResponse,
	type SigortaDurumResponse,
	type AracFirmaDetayResponse,
} from "@/requests/dashboard";
import { queryOptions } from "@tanstack/react-query";

// MTV Durum Query Options
export function getMTVDurumQueryOptions(
	yil: string,
	taksit: string,
	odendi: boolean
) {
	return queryOptions({
		queryKey: ["dashboard", "mtv", { yil, taksit, odendi }],
		queryFn: () => getMTVDurum(yil, taksit, odendi),
		staleTime: 5 * 60 * 1000, // 5 dakika
	});
}

// Muayene Durum Query Options
export function getMuayeneDurumQueryOptions() {
	return queryOptions({
		queryKey: ["dashboard", "muayene"],
		queryFn: () => getMuayeneDurum(),
		staleTime: 5 * 60 * 1000, // 5 dakika
	});
}

// Sigorta Durum Query Options
export function getSigortaDurumQueryOptions() {
	return queryOptions({
		queryKey: ["dashboard", "sigorta"],
		queryFn: () => getSigortaDurum(),
		staleTime: 5 * 60 * 1000, // 5 dakika
	});
}

// Filo Durum Query Options
export function getFiloDurumQueryOptions(status: "aktif" | "pasif") {
	return queryOptions({
		queryKey: ["dashboard", "filo", { status }],
		queryFn: () => getFiloDurum(status),
		staleTime: 5 * 60 * 1000, // 5 dakika
	});
}

// Firma Araç Sayısı Query Options
export function getFirmaAracSayisiQueryOptions() {
	return queryOptions({
		queryKey: ["dashboard", "firma"],
		queryFn: () => getFirmaAracSayisi(),
		staleTime: 5 * 60 * 1000, // 5 dakika
	});
}

// Kiralanan Araçlar Query Options
export function getKiralananAraclarQueryOptions() {
	return queryOptions({
		queryKey: ["dashboard", "kira"],
		queryFn: () => getKiralananAraclar(),
		staleTime: 5 * 60 * 1000, // 5 dakika
	});
}

// Export types for use in components
export type {
	MTVDurumResponse,
	MuayeneDurumResponse,
	SigortaDurumResponse,
	AracFirmaDetayResponse,
};
