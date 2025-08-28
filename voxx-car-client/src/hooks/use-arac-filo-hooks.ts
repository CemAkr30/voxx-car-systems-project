import {
	createAracFilo,
	deleteAracFilo,
	getAllAracFilo,
	getAracFilo,
	updateAracFilo,
} from "@/requests/arac-filo";
import type { CreateAracFiloRequest, AracFilo } from "@/schemas/arac-filo";
import { queryOptions, useMutation } from "@tanstack/react-query";

export function getAracFilolarQueryOptions() {
	return queryOptions({
		queryKey: ["aracFilolar"],
		queryFn: getAllAracFilo,
	});
}

export function getAracFiloQueryOptions(aracFiloId: string) {
	return queryOptions({
		queryKey: ["aracFilo", { aracFiloId }],
		queryFn: () => getAracFilo(aracFiloId),
	});
}

export const useCreateAracFiloMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (aracFilo: CreateAracFiloRequest): Promise<void> =>
			await createAracFilo(aracFilo),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateAracFiloMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (aracFilo: AracFilo) => await updateAracFilo(aracFilo),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteAracFiloMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (id: string) => await deleteAracFilo(id),
		onSuccess() {
			onSuccess?.();
		},
	});
};
