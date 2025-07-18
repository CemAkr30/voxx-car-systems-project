import {
	createMuayene,
	deleteMuayene,
	getMuayeneByAracFiloId,
	updateMuayene,
} from "@/requests/muayene";
import type { CreateMuayeneRequest, Muayene } from "@/schemas/muayene";
import { queryOptions, useMutation } from "@tanstack/react-query";

export function getMuayenelerByAracFiloIdQueryOptions(aracFiloId: string) {
	return queryOptions({
		queryKey: ["aracFilo", { aracFiloId }, "muayene"],
		queryFn: () => getMuayeneByAracFiloId(aracFiloId),
	});
}

export const useCreateMuayeneMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (muayene: CreateMuayeneRequest): Promise<void> =>
			await createMuayene(muayene),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateMuayeneMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (muayene: Muayene) => await updateMuayene(muayene),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteMuayeneMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (id: string) => await deleteMuayene(id),
		onSuccess() {
			onSuccess?.();
		},
	});
};
