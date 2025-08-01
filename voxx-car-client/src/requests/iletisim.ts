import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { CreateIletisimRequest, Iletisim } from "@/schemas/iletisim";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getIletisimByFirmaId = async (
	firmaId: string,
): Promise<Iletisim[]> => {
	const { data } = await axiosClient.get<Iletisim[]>(
		`${urls.firma}/${firmaId}/iletisim`,
	);
	return data.filter((d) => !d.isDeleted);
};

export const createIletisim = async (
	iletisim: CreateIletisimRequest,
): Promise<void> => {
	try {
		await axiosClient.post<Iletisim>(`${urls.iletisim}`, iletisim);
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Iletisimyı kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating iletisim");
	}
};

export const updateIletisim = async (iletisim: Iletisim): Promise<void> => {
	try {
		await axiosClient.put<Iletisim>(
			`${urls.iletisim}/${iletisim.id}`,
			iletisim,
		);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Iletisimyı güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating iletisim");
	}
};

export const deleteIletisim = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.iletisim}/${id}`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Iletisimyı silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating iletisim");
	}
};
