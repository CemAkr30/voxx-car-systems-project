import {
	createHasar,
	deleteHasar,
	getHasarByAracFiloId,
	updateHasar,
} from "@/requests/hasar";
import type { CreateHasarRequest, Hasar } from "@/schemas/hasar";
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export function getHasarlarByAracFiloIdQueryOptions(aracFiloId: string) {
	return queryOptions({
		queryKey: ["firma", { aracFiloId }, "hasar"],
		queryFn: () => getHasarByAracFiloId(aracFiloId),
	});
}

export const useCreateHasarMutation = (
	aracFiloId: string,
	onSuccess?: () => void,
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (hasar: CreateHasarRequest): Promise<void> => {
			await createHasar(hasar);
		},
		onSuccess() {
			queryClient.invalidateQueries(
				getHasarlarByAracFiloIdQueryOptions(aracFiloId),
			);
			onSuccess?.();
		},
	});
};

export const useUpdateHasarMutation = (
	aracFiloId: string,
	onSuccess?: () => void,
) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (hasar: Hasar) => {
			await updateHasar(hasar);
		},
		onSuccess() {
			queryClient.invalidateQueries(
				getHasarlarByAracFiloIdQueryOptions(aracFiloId),
			);
			onSuccess?.();
		},
	});
};

export const useDeleteHasarMutation = (
	aracFiloId: string,
	onSuccess?: () => void,
) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await deleteHasar(id);
		},
		onSuccess() {
			queryClient.invalidateQueries(
				getHasarlarByAracFiloIdQueryOptions(aracFiloId),
			);
			onSuccess?.();
		},
	});
};
