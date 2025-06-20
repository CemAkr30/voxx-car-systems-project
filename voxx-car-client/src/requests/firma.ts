import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { CreateFirmaRequest, Firma } from "@/schemas/firma";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getAllFirma = async (): Promise<Firma[]> => {
	const { data } = await axiosClient.get(`${urls.firma}`);
	return data;
};

export const createFirma = async (firma: CreateFirmaRequest): Promise<void> => {
	try {
		await axiosClient.post<Firma>(`${urls.firma}`, firma);
		toast.success("Firma başarılı bir şekilde kayıt edildi");
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
		toast.success("Firma başarılı bir şekilde güncellendi");
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
		toast.success("Firma başarılı bir şekilde silindi");
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Firmayı silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating firma");
	}
};
