import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { CreateMarkaRequest, Marka } from "@/schemas/marka";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getAllMarka = async (): Promise<Marka[]> => {
	const { data } = await axiosClient.get<Marka[]>(`${urls.marka}`);
	return data.filter((d) => !d.isDeleted);
};

export const createMarka = async (marka: CreateMarkaRequest): Promise<void> => {
	try {
		await axiosClient.post<Marka>(`${urls.marka}`, marka);
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Markayı kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating marka");
	}
};

export const updateMarka = async (marka: Marka): Promise<void> => {
	try {
		await axiosClient.put<Marka>(`${urls.marka}/${marka.id}`, marka);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Markayı güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating marka");
	}
};

export const deleteMarka = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.marka}/${id}`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Markayı silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating marka");
	}
};
