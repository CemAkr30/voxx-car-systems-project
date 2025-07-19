import {createBakim, deleteBakim, getBakimByAracFiloId, updateBakim,} from "@/requests/bakim";
import type {Bakim, CreateBakimRequest} from "@/schemas/bakim";
import {queryOptions, useMutation} from "@tanstack/react-query";

export function getBakimByAracFiloIdQueryOptions(aracFiloId: string) {
    return queryOptions({
        queryKey: ["aracFilo", {aracFiloId}, "bakim"],
        queryFn: () => getBakimByAracFiloId(aracFiloId),
    });
}

export const useCreateBakimMutation = (onSuccess?: () => void) => {
    return useMutation({
        mutationFn: async (bakim: CreateBakimRequest): Promise<void> =>
            await createBakim(bakim),
        onSuccess() {
            onSuccess?.();
        },
    });
};

export const useUpdateBakimMutation = (onSuccess?: () => void) => {
    return useMutation({
        mutationFn: async (bakim: Bakim) => await updateBakim(bakim),
        onSuccess() {
            onSuccess?.();
        },
    });
};

export const useDeleteBakimMutation = (onSuccess?: () => void) => {
    return useMutation({
        mutationFn: async (id: string) => await deleteBakim(id),
        onSuccess() {
            onSuccess?.();
        },
    });
};
