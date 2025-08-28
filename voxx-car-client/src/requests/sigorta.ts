import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { CreateSigortaRequest, Sigorta } from "@/schemas/sigorta";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getSigortaByAracFiloId = async (
	aracFiloId: string,
): Promise<Sigorta[]> => {
	const { data } = await axiosClient.get<Sigorta[]>(
		`${urls.aracfilo}/${aracFiloId}/sigorta`,
	);
	return data.filter((d) => !d.isDeleted);
};

export const createSigorta = async (
	sigorta: CreateSigortaRequest,
): Promise<void> => {
	try {
		await axiosClient.post<Sigorta>(`${urls.sigorta}`, sigorta);
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Sigortayı kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating sigorta");
	}
};

export const updateSigorta = async (sigorta: Sigorta): Promise<void> => {
	try {
		await axiosClient.put<Sigorta>(`${urls.sigorta}/${sigorta.id}`, sigorta);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Sigortayı güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating sigorta");
	}
};

export const deleteSigorta = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.sigorta}/${id}`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Sigortayı silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating sigorta");
	}
};
