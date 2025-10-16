import {
	createBakim,
	deleteBakim,
	getBakimByAracFiloId,
	updateBakim,
} from "@/requests/bakim";
import type { Bakim, CreateBakimRequest } from "@/schemas/bakim";
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export function getBakimlarByAracFiloIdQueryOptions(aracFiloId: string) {
	return queryOptions({
		queryKey: ["aracFilo", { aracFiloId }, "bakim"],
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

export const useDeleteBakimMutation = (
	aracFiloId: string,
	onSuccess?: () => void,
) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteBakim(id),
		async onSuccess() {
			onSuccess?.();
			await queryClient.invalidateQueries(
				getBakimlarByAracFiloIdQueryOptions(aracFiloId),
			);
		},
	});
};
