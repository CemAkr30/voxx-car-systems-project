// import urls from "@/constants/apiUrls";
// import { axiosClient } from "@/lib/axios";
// import { isAxiosError } from "axios";
// import { toast } from "sonner";

import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";

// Dashboard API response types
export interface MTVDurumResponse {
	toplamKayit: number;
	toplamTutar: number;
	mtvler: Array<{
		plaka: string;
		yil: string;
		taksit: string;
		makbuzNo: string;
		miktar: number;
		odemeTipi: string;
		odeyenFirmaUnvani: string;
		aciklama: string;
		gecikmeCezasi: string;
		odendi: boolean;
	}>;
}

export interface MuayeneDurumResponse {
	toplamKayit: number;
	toplamTutar: number;
	muayeneler: Array<{
		plaka: string;
		muayeneTipi: string;
		makbuzNo: string;
		odeyenFirmaUnvani: string | null;
		baslangicTarihi: string;
		bitisTarihi: string;
		gecikmeCezasi: string;
		aciklama: string;
		yeri: string;
		miktar: number;
		odemeTipi: string;
		odendi: boolean;
		kalanGun: number;
	}>;
}

export interface SigortaDurumResponse {
	toplamKayit: number;
	sigortalar: Array<{
		plaka: string;
		tip: string;
		sigortaSirketi: string;
		acente: string;
		policeNo: string;
		baslangicTarihi: string;
		bitisTarihi: string;
		kalanGun: number;
	}>;
}

export interface AracFirmaDetayResponse {
	id: string;
	aracFiloId: string;
	firmaId: string;
	sozlesmeBaslangicTarihi: string;
	sozlesmeBitisTarihi: string;
	teslimatTutanagi?: string;
	sozlesme?: string;
	odemeVadesi?: number;
	createdAt: string;
	updatedAt: string;
	deleted: boolean;
}

// API functions
export const getMTVDurum = async (
	status: "odenmis" | "odenmemis"
): Promise<MTVDurumResponse> => {
	try {
		const { data } = await axiosClient.get<MTVDurumResponse>(
			`${urls.dashboard}/mtv`,
			{
				params: { status }
			}
		);
		return data;
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("MTV durumu getirilirken sorun oluştu");
			throw new Error(error.request?.response?.data?.message || "MTV durumu getirilemedi");
		}
		throw new Error("MTV durumu getirilemedi");
	}
};

export const getMuayeneDurum = async (
	status: "odenmis" | "odenmemis"
): Promise<MuayeneDurumResponse> => {
	try {
		const { data } = await axiosClient.get<MuayeneDurumResponse>(
			`${urls.dashboard}/muayene`,
			{
				params: { status }
			}
		);
		return data;
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Muayene durumu getirilirken sorun oluştu");
			throw new Error(error.request?.response?.data?.message || "Muayene durumu getirilemedi");
		}
		throw new Error("Muayene durumu getirilemedi");
	}
};

export const getSigortaDurum = async (): Promise<SigortaDurumResponse> => {
	try {
		const { data } = await axiosClient.get<SigortaDurumResponse>(
			`${urls.dashboard}/sigorta`
		);
		return data;
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Sigorta durumu getirilirken sorun oluştu");
			throw new Error(error.request?.response?.data?.message || "Sigorta durumu getirilemedi");
		}
		throw new Error("Sigorta durumu getirilemedi");
	}
};

export const getFiloDurum = async (status: "aktif" | "pasif"): Promise<any[]> => {
	try {
		const { data } = await axiosClient.get<any[]>(
			`${urls.dashboard}/filo`,
			{
				params: { status }
			}
		);
		return data;
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Filo durumu getirilirken sorun oluştu");
			throw new Error(error.request?.response?.data?.message || "Filo durumu getirilemedi");
		}
		throw new Error("Filo durumu getirilemedi");
	}
};

export const getFirmaAracSayisi = async (): Promise<string[]> => {
	
	try {
		const { data } = await axiosClient.get<string[]>(
			`${urls.dashboard}/firma`
		);
		return data;
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Firma araç sayısı getirilirken sorun oluştu");
			throw new Error(error.request?.response?.data?.message || "Firma araç sayısı getirilemedi");
		}
		throw new Error("Firma araç sayısı getirilemedi");
	}
};

export const getKiralananAraclar = async (): Promise<AracFirmaDetayResponse[]> => {
	try {
		const { data } = await axiosClient.get<AracFirmaDetayResponse[]>(
			`${urls.dashboard}/kira`
		);
		return data;
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Kiralanan araçlar getirilirken sorun oluştu");
			throw new Error(error.request?.response?.data?.message || "Kiralanan araçlar getirilemedi");
		}
		throw new Error("Kiralanan araçlar getirilemedi");
	}
};
