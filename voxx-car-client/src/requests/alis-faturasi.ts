import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type {
	AlisFaturasi,
	CreateAlisFaturasiRequest,
} from "@/schemas/alis-faturasi";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getAlisFaturasiByAracFiloId = async (
	aracFiloId: string,
): Promise<AlisFaturasi[]> => {
	const { data } = await axiosClient.get(
		`${urls.aracfilo}/${aracFiloId}/alisfaturasi`,
	);
	return data;
};

export const createAlisFaturasi = async (
	alisFaturasi: CreateAlisFaturasiRequest,
): Promise<void> => {
	try {
		await axiosClient.post<AlisFaturasi>(`${urls.alisfaturasi}`, alisFaturasi);
		toast.success("Alış faturası başarılı bir şekilde kayıt edildi");
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Alış faturası kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating alisfaturasi");
	}
};

export const updateAlisFaturasi = async (
	alisFaturasi: AlisFaturasi,
): Promise<void> => {
	try {
		await axiosClient.put<AlisFaturasi>(
			`${urls.alisfaturasi}/${alisFaturasi.id}`,
			alisFaturasi,
		);
		toast.success("Alış faturası başarılı bir şekilde güncellendi");
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Alış faturası güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating alisfaturasi");
	}
};

export const deleteAlisFaturasi = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.alisfaturasi}/${id}`);
		toast.success("Alış faturası başarılı bir şekilde silindi");
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Alış faturası silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating alisfaturasi");
	}
};
