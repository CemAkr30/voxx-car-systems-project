import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { Kaza, CreateKazaRequest } from "@/schemas/kaza";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getKazaByAracFiloId = async (
	aracFiloId: string,
): Promise<Kaza[]> => {
	const { data } = await axiosClient.get(`${urls.aracfilo}/${aracFiloId}/kaza`);
	return data;
};

export const createKaza = async (kaza: CreateKazaRequest): Promise<void> => {
	try {
		await axiosClient.post<Kaza>(`${urls.kaza}`, kaza);
		toast.success("Kaza başarılı bir şekilde kayıt edildi");
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Kazai kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating kaza");
	}
};

export const updateKaza = async (kaza: Kaza): Promise<void> => {
	try {
		await axiosClient.put<Kaza>(`${urls.kaza}/${kaza.id}`, kaza);
		toast.success("Kaza başarılı bir şekilde güncellendi");
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Kazai güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating kaza");
	}
};

export const deleteKaza = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.kaza}/${id}`);
		toast.success("Kaza başarılı bir şekilde silindi");
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Kazai silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating kaza");
	}
};
