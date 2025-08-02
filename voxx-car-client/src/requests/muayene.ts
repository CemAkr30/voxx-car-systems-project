import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { CreateMuayeneRequest, Muayene } from "@/schemas/muayene";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getMuayeneByAracFiloId = async (
	aracFiloId: string,
): Promise<Muayene[]> => {
	const { data } = await axiosClient.get<Muayene[]>(
		`${urls.aracfilo}/${aracFiloId}/muayene`,
	);
	return data.filter((d) => !d.isDeleted);
};

export const createMuayene = async (
	muayene: CreateMuayeneRequest,
): Promise<void> => {
	try {
		await axiosClient.post<Muayene>(`${urls.muayene}`, muayene);
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Muayeneyı kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating muayene");
	}
};

export const updateMuayene = async (muayene: Muayene): Promise<void> => {
	try {
		await axiosClient.put<Muayene>(`${urls.muayene}/${muayene.id}`, muayene);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Muayeneyı güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating muayene");
	}
};

export const deleteMuayene = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.muayene}/${id}`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Muayeneyı silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating muayene");
	}
};
