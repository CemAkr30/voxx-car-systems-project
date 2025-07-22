import {
	createHasar,
	deleteHasar,
	getHasarByAracFiloId,
	updateHasar,
} from "@/requests/hasar";
import type { CreateHasarRequest, Hasar } from "@/schemas/hasar";
import { queryOptions, useMutation } from "@tanstack/react-query";

export function getHasarlarByAracFiloIdQueryOptions(aracFiloId: string) {
	return queryOptions({
		queryKey: ["aracFilo", { aracFiloId }, "hasar"],
		queryFn: () => getHasarByAracFiloId(aracFiloId),
	});
}

export const useCreateHasarMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (hasar: CreateHasarRequest): Promise<void> =>
			await createHasar(hasar),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateHasarMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (hasar: Hasar) => await updateHasar(hasar),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteHasarMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (id: string) => await deleteHasar(id),
		onSuccess() {
			onSuccess?.();
		},
	});
};
