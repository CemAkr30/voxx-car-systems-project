import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { CreateMtvRequest, Mtv } from "@/schemas/mtv";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getMtvByAracFiloId = async (
	aracFiloId: string,
): Promise<Mtv[]> => {
	const { data } = await axiosClient.get(`${urls.aracfilo}/${aracFiloId}/mtv`);
	return data;
};

export const createMtv = async (mtv: CreateMtvRequest): Promise<void> => {
	try {
		await axiosClient.post<Mtv>(`${urls.mtv}`, mtv);
		toast.success("Mtv başarılı bir şekilde kayıt edildi");
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
		toast.success("Mtv başarılı bir şekilde güncellendi");
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
		toast.success("Mtv başarılı bir şekilde silindi");
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Mtvyı silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating mtv");
	}
};
