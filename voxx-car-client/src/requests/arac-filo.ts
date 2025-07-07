import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { CreateAracFiloRequest, AracFilo } from "@/schemas/arac-filo";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getAllAracFilo = async (): Promise<AracFilo[]> => {
	const { data } = await axiosClient.get(`${urls.aracfilo}`);
	return data;
};

export const getAracFilo = async (id: string): Promise<AracFilo> => {
	const { data } = await axiosClient.get(`${urls.aracfilo}/${id}`);
	return data;
};

export const createAracFilo = async (
	aracFilo: CreateAracFiloRequest,
): Promise<void> => {
	try {
		await axiosClient.post<AracFilo>(`${urls.aracfilo}`, aracFilo);
		toast.success("AracFilo başarılı bir şekilde kayıt edildi");
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("AracFiloyı kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating aracFilo");
	}
};

export const updateAracFilo = async (aracFilo: AracFilo): Promise<void> => {
	try {
		await axiosClient.put<AracFilo>(
			`${urls.aracfilo}/${aracFilo.id}`,
			aracFilo,
		);
		toast.success("AracFilo başarılı bir şekilde güncellendi");
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("AracFiloyı güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating aracFilo");
	}
};

export const deleteAracFilo = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.aracfilo}/${id}`);
		toast.success("AracFilo başarılı bir şekilde silindi");
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("AracFiloyı silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating aracFilo");
	}
};
