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
	const { data } = await axiosClient.get<FilodanCikis[]>(
		`${urls.aracfilo}/${aracFiloId}/filodancikis`,
	);
	return data.filter((d) => !d.deleted);
};

	export const createFilodanCikis = async (
		filodanCikis: CreateFilodanCikisRequest,
	): Promise<void> => {
		try {
			await axiosClient.post<FilodanCikis>(`${urls.filodancikis}`, filodanCikis);
			toast.success("Filodan çıkış başarıyla oluşturuldu");
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
			toast.success("Filodan çıkış başarıyla güncellendi");
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
			toast.success("Filodan çıkış başarıyla silindi");
		} catch (error) {
			if (isAxiosError(error)) {
				toast.error("FilodanCikisi silerken sorun oluştu");
				throw new Error(error.request?.response.code);
			}
			throw new Error("error creating filodanCikis");
		}
	};
