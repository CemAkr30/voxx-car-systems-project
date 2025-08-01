import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { CreateModelRequest, Model } from "@/schemas/model";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getAllModel = async (): Promise<Model[]> => {
	const { data } = await axiosClient.get<Model[]>(`${urls.model}`);
	return data.filter((d) => !d.deleted);
};

export const getModelByMarkaId = async (markaId: string): Promise<Model[]> => {
	try {
		const { data } = await axiosClient.get<Model[]>(
			`${urls.marka}/${markaId}/model`,
		);
		return data.filter((d) => !d.deleted);
	} catch (_error) {
		return [];
	}
};

export const createModel = async (model: CreateModelRequest): Promise<void> => {
	try {
		await axiosClient.post<Model>(`${urls.model}`, model);
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error("Modeli kayıt ederken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error creating Model");
	}
};

export const updateModel = async (model: Model): Promise<void> => {
	try {
		await axiosClient.put<Model>(`${urls.model}/${model.id}`, model);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Modelyı güncellerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error updating Model");
	}
};

export const deleteModel = async (id: string): Promise<void> => {
	try {
		await axiosClient.delete(`${urls.model}/${id}`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error("Modeli silerken sorun oluştu");
			throw new Error(error.request?.response.code);
		}
		throw new Error("error deleting Model");
	}
};
