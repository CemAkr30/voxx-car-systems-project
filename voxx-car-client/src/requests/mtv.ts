import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { CreateMtvRequest, Mtv } from "@/schemas/mtv";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getAllMtv = async (): Promise<Mtv[]> => {
	const { data } = await axiosClient.get<Mtv[]>(`${urls.mtv}`);
	return data.filter((d) => !d.isDeleted);
};

export const getMtvByAracFiloId = async (
	aracFiloId: string,
): Promise<Mtv[]> => {
	const { data } = await axiosClient.get<Mtv[]>(
		`${urls.aracfilo}/${aracFiloId}/mtv`,
	);
	return data.filter((d) => !d.isDeleted);
};

export const createMtv = async (mtv: CreateMtvRequest): Promise<void> => {
	try {
		await axiosClient.post<Mtv>(`${urls.mtv}`, mtv);
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Mtvyı kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating mtv");
	}
};

export const updateMtv = async (mtv: Mtv): Promise<void> => {
	try {
		await axiosClient.put<Mtv>(`${urls.mtv}/${mtv.id}`, mtv);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Mtvyı güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating mtv");
	}
};

export const deleteMtv = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.mtv}/${id}`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Mtvyı silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating mtv");
	}
};
