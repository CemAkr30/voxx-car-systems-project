import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { Kaza, CreateKazaRequest } from "@/schemas/kaza";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getKazaByAracFiloId = async (
	aracFiloId: string,
): Promise<Kaza[]> => {
	const { data } = await axiosClient.get<Kaza[]>(
		`${urls.aracfilo}/${aracFiloId}/kaza`,
	);
	return data.filter((d) => !d.isDeleted);
};

export const createKaza = async (kaza: CreateKazaRequest): Promise<void> => {
	try {
		await axiosClient.post<Kaza>(`${urls.kaza}`, kaza);
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
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Kazai silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating kaza");
	}
};
