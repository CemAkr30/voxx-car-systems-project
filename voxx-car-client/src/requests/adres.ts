import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { CreateAdresRequest, Adres } from "@/schemas/adres";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getAdresByFirmaId = async (firmaId: string): Promise<Adres[]> => {
	const { data } = await axiosClient.get<Adres[]>(
		`${urls.firma}/${firmaId}/adres`,
	);
	return data.filter((d) => !d.deleted);
};

export const createAdres = async (adres: CreateAdresRequest): Promise<void> => {
	try {
		await axiosClient.post<Adres>(`${urls.adres}`, adres);
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Adresyı kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating adres");
	}
};

export const updateAdres = async (adres: Adres): Promise<void> => {
	try {
		await axiosClient.put<Adres>(`${urls.adres}/${adres.id}`, adres);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Adresyı güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating adres");
	}
};

export const deleteAdres = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.adres}/${id}`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Adresyı silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating adres");
	}
};
