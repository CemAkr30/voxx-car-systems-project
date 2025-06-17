import urls from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios";
import type { CreateModelRequest, Model } from "@/schemas/model";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const getAllModel = async (): Promise<Model[]> => {
  const { data } = await axiosClient.get(`${urls.model}`);
  return data;
};

export const createModel = async (model: CreateModelRequest): Promise<void> => {
  try {
    await axiosClient.post<Model>(`${urls.model}`, model);
    toast.success("Model başarılı bir şekilde kayıt edildi");
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
    toast.success("Model başarılı bir şekilde güncellendi");
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
    toast.success("Model başarılı bir şekilde silindi");
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error("Modeli silerken sorun oluştu");
      throw new Error(error.request?.response.code);
    }
    throw new Error("error deleting Model");
  }
};
