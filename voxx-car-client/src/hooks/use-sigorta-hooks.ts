import {
	createSigorta,
	deleteSigorta,
	getSigortaByAracFiloId,
	updateSigorta,
} from "@/requests/sigorta";
import type { CreateSigortaRequest, Sigorta } from "@/schemas/sigorta";
import { queryOptions, useMutation } from "@tanstack/react-query";

export function getSigortalarByAracFiloIdQueryOptions(aracFiloId: string) {
	return queryOptions({
		queryKey: ["firma", { aracFiloId }, "sigorta"],
		queryFn: () => getSigortaByAracFiloId(aracFiloId),
	});
}

export const useCreateSigortaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (sigorta: CreateSigortaRequest): Promise<void> =>
			await createSigorta(sigorta),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateSigortaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (sigorta: Sigorta) => await updateSigorta(sigorta),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteSigortaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (id: string) => await deleteSigorta(id),
		onSuccess() {
			onSuccess?.();
		},
	});
};
