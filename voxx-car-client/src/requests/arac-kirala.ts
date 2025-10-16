import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type {
	AracKirala,
	CreateAracKiralaRequest,
} from "@/schemas/arac-kirala";
import { isAxiosError } from "axios";
import { toast } from "sonner";

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
