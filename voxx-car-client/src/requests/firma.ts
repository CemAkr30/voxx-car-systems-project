import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { CreateFirmaRequest, Firma, FirmaDokumanEkleRequest, FirmaDokuman } from "@/schemas/firma";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getAllFirma = async (): Promise<Firma[]> => {
	const { data } = await axiosClient.get<Firma[]>(`${urls.firma}`);
	return data.filter((d) => !d.deleted);
};

export const getFirma = async (id: string): Promise<Firma> => {
	const { data } = await axiosClient.get(`${urls.firma}/${id}`);
	return data;
};

export const createFirma = async (firma: CreateFirmaRequest): Promise<void> => {
	try {
		await axiosClient.post<Firma>(`${urls.firma}`, firma);
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Firmayı kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating firma");
	}
};

export const updateFirma = async (firma: Firma): Promise<void> => {
	try {
		await axiosClient.put<Firma>(`${urls.firma}/${firma.id}`, firma);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Firmayı güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating firma");
	}
};

export const deleteFirma = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.firma}/${id}`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Firmayı silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating firma");
	}
};

export const firmaDokumanEkle = async (dokuman: FirmaDokumanEkleRequest): Promise<void> => {
	try {
		await axiosClient.post(`${urls.firma}/dokuman-ekle`, dokuman);
		toast.success("Doküman başarıyla eklendi");
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Doküman eklerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error adding document");
	}
};

export const getFirmaDokumanlar = async (firmaId: string): Promise<FirmaDokuman[]> => {
	try {
		const { data } = await axiosClient.get<FirmaDokuman[]>(`${urls.firma}/${firmaId}/dokumanlar`);
		return data.filter((d) => !d.isDeleted);
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Dokümanları getirirken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error getting documents");
	}
};

export const firmaDokumanSil = async (firmaId: string, dokumanId: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.firma}/${firmaId}/dokuman-sil/${dokumanId}`);
		toast.success("Doküman başarıyla silindi");
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Doküman silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error deleting document");
	}
};