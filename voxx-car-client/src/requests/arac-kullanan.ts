import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type {
	CreateAracKullananRequest,
	AracKullanan,
} from "@/schemas/arac-kullanan";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getAracKullananlar = async (): Promise<AracKullanan[]> => {
	const { data } = await axiosClient.get(`${urls.arackullanan}`);
	return data;
};

export const getAllAracKullananlarByFirmaId = async (
	firmaId: string,
): Promise<AracKullanan[]> => {
	const { data } = await axiosClient.get(
		`${urls.firma}/${firmaId}/arackullanan`,
	);
	return data;
};

export const createAracKullanan = async (
	aracKullanan: CreateAracKullananRequest,
): Promise<void> => {
	try {
		await axiosClient.post<AracKullanan>(`${urls.arackullanan}`, aracKullanan);
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("AracKullananyı kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating aracKullanan");
	}
};

export const updateAracKullanan = async (
	aracKullanan: AracKullanan,
): Promise<void> => {
	try {
		await axiosClient.put<AracKullanan>(
			`${urls.arackullanan}/${aracKullanan.id}`,
			aracKullanan,
		);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("AracKullananyı güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating aracKullanan");
	}
};

export const deleteAracKullanan = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.arackullanan}/${id}`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("AracKullananyı silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating aracKullanan");
	}
};
