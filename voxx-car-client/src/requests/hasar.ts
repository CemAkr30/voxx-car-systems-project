import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { CreateHasarRequest, Hasar } from "@/schemas/hasar";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getHasarByAracFiloId = async (
	aracFiloId: string,
): Promise<Hasar[]> => {
	const { data } = await axiosClient.get<Hasar[]>(
		`${urls.aracfilo}/${aracFiloId}/hasar`,
	);
	return data.filter((d) => !d.deleted);
};

export const createHasar = async (hasar: CreateHasarRequest): Promise<void> => {
	try {
		await axiosClient.post<Hasar>(`${urls.hasar}`, hasar);
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Hasaryı kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating hasar");
	}
};

export const updateHasar = async (hasar: Hasar): Promise<void> => {
	try {
		await axiosClient.put<Hasar>(`${urls.hasar}/${hasar.id}`, hasar);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Hasaryı güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating hasar");
	}
};

export const deleteHasar = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.hasar}/${id}`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Hasaryı silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating hasar");
	}
};
