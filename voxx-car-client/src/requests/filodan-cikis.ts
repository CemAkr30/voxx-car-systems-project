import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type {
	FilodanCikis,
	CreateFilodanCikisRequest,
} from "@/schemas/filodan-cikis";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getFilodanCikisByAracFiloId = async (
	aracFiloId: string,
): Promise<FilodanCikis[]> => {
	const { data } = await axiosClient.get(
		`${urls.aracfilo}/${aracFiloId}/filodancikis`,
	);
	return data;
};

export const createFilodanCikis = async (
	filodanCikis: CreateFilodanCikisRequest,
): Promise<void> => {
	try {
		await axiosClient.post<FilodanCikis>(`${urls.filodancikis}`, filodanCikis);
		toast.success("FilodanCikis başarılı bir şekilde kayıt edildi");
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("FilodanCikisi kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating filodanCikis");
	}
};

export const updateFilodanCikis = async (
	filodanCikis: FilodanCikis,
): Promise<void> => {
	try {
		await axiosClient.put<FilodanCikis>(
			`${urls.filodancikis}/${filodanCikis.id}`,
			filodanCikis,
		);
		toast.success("FilodanCikis başarılı bir şekilde güncellendi");
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("FilodanCikisi güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating filodanCikis");
	}
};

export const deleteFilodanCikis = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.filodancikis}/${id}`);
		toast.success("FilodanCikis başarılı bir şekilde silindi");
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("FilodanCikisi silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating filodanCikis");
	}
};
