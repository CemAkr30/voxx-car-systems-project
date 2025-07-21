import {
	createKaza,
	deleteKaza,
	getKazaByAracFiloId,
	updateKaza,
} from "@/requests/kaza";
import type { CreateKazaRequest, Kaza } from "@/schemas/kaza";
import { queryOptions, useMutation } from "@tanstack/react-query";

export function getKazaByAracFiloIdQueryOptions(aracFiloId: string) {
	return queryOptions({
		queryKey: ["aracFilo", { aracFiloId }, "kaza"],
		queryFn: () => getKazaByAracFiloId(aracFiloId),
	});
}

export const useCreateKazaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (kaza: CreateKazaRequest): Promise<void> =>
			await createKaza(kaza),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateKazaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (kaza: Kaza) => await updateKaza(kaza),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteKazaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (id: string) => await deleteKaza(id),
		onSuccess() {
			onSuccess?.();
		},
	});
};
