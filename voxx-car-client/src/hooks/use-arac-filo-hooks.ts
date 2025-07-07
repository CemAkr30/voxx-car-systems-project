import {
	createAracFilo,
	deleteAracFilo,
	getAllAracFilo,
	getAracFilo,
	updateAracFilo,
} from "@/requests/arac-filo";
import type { CreateAracFiloRequest, AracFilo } from "@/schemas/arac-filo";
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

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
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (aracFilo: CreateAracFiloRequest): Promise<void> => {
			await createAracFilo(aracFilo);
		},
		onSuccess() {
			queryClient.invalidateQueries(getAracFilolarQueryOptions());
			onSuccess?.();
		},
	});
};

export const useUpdateAracFiloMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (aracFilo: AracFilo) => {
			await updateAracFilo(aracFilo);
			await queryClient.invalidateQueries(getAracFiloQueryOptions(aracFilo.id));
		},
		onSuccess() {
			queryClient.invalidateQueries(getAracFilolarQueryOptions());
			onSuccess?.();
		},
	});
};

export const useDeleteAracFiloMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteAracFilo(id),
		onSuccess() {
			queryClient.invalidateQueries(getAracFilolarQueryOptions());
			onSuccess?.();
		},
	});
};
