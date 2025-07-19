import urls from "@/constants/apiUrls";
import {axiosClient} from "@/lib/axios";
import type {Bakim, CreateBakimRequest} from "@/schemas/bakim";
import {isAxiosError} from "axios";
import {toast} from "sonner";

export const getBakimByAracFiloId = async (
    aracFiloId: string,
): Promise<Bakim[]> => {
    const {data} = await axiosClient.get(
        `${urls.aracfilo}/${aracFiloId}/bakim`,
    );
    return data;
};

export const createBakim = async (
    bakim: CreateBakimRequest,
): Promise<void> => {
    try {
        await axiosClient.post<Bakim>(`${urls.bakim}`, bakim);
        toast.success("Bakim başarılı bir şekilde kayıt edildi");
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            toast.error("Bakimi kayıt ederken sorun oluştu");
            throw new Error(error.request?.response.code);
        }
        throw new Error("error creating bakim");
    }
};

export const updateBakim = async (bakim: Bakim): Promise<void> => {
    try {
        await axiosClient.put<Bakim>(`${urls.bakim}/${bakim.id}`, bakim);
        toast.success("Bakim başarılı bir şekilde güncellendi");
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error("Bakimi güncellerken sorun oluştu");
            throw new Error(error.request?.response.code);
        }
        throw new Error("error creating bakim");
    }
};

export const deleteBakim = async (id: string): Promise<void> => {
    try {
        await axiosClient.delete(`${urls.bakim}/${id}`);
        toast.success("Bakim başarılı bir şekilde silindi");
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error("Bakimi silerken sorun oluştu");
            throw new Error(error.request?.response.code);
        }
        throw new Error("error creating bakim");
    }
};
