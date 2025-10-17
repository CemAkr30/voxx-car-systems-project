import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { AracFilo } from "@/schemas/arac-filo";
import type {
	AracKirala,
	CreateAracKiralaRequest,
} from "@/schemas/arac-kirala";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getKiralanabilirAracFilolar = async (): Promise<AracFilo[]> => {
	const { data } = await axiosClient.get<AracFilo[]>(`${urls.aracfilo}/kiralanabilir-araclar`);
	return data.filter((d) => !d.deleted);
};

export const getKiralikAracFilolarByFirmaId = async (
	firmaId: string,
): Promise<AracKirala[]> => {
	const { data } = await axiosClient.get<AracKirala[]>(
		`${urls.firma}/${firmaId}/kiralanan-araclar`,
	);
	return data.filter((d) => !d.deleted);
};

export const getKiralayanFirmalarByAracFiloId = async (
	aracFiloId: string,
): Promise<AracKirala[]> => {
	const { data } = await axiosClient.get<AracKirala[]>(
		`${urls.aracfilo}/${aracFiloId}/kiralayan-firmalar`,
	);
	return data.filter((d) => !d.deleted);
};

export const createAracKirala = async (
	aracKira: CreateAracKiralaRequest,
): Promise<void> => {
	try {
		await axiosClient.post<AracKirala>(`${urls.aracfilo}/kirala`, aracKira);
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Araç kira kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating aracKira");
	}
};

export const updateAracKirala = async (
	id: string,
	aracKira: CreateAracKiralaRequest,
): Promise<void> => {
	try {
		await axiosClient.put<AracKirala>(`${urls.aracfilo}/kirala/${id}`, aracKira);
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Araç kira güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error updating aracKira");
	}
};

export const deleteAracKirala = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.aracfilo}/kirala/${id}`);
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Araç kira silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error deleting aracKira");
	}
};