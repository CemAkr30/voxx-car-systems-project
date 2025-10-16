import {
	createAracFilo,
	deleteAracFilo,
	getAllAracFilo,
	getAracFilo,
	updateAracFilo,
	updateAracFiloTramer,
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

export const useUpdateAracFiloTramerMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async ({ aracFiloId, tramer, tramerTutari }: { aracFiloId: string, tramer: boolean, tramerTutari: number }) => await updateAracFiloTramer(aracFiloId, tramer, tramerTutari),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteAracFiloMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteAracFilo(id),
		async onSuccess() {
			onSuccess?.();
			queryClient.invalidateQueries(getAracFilolarQueryOptions());
		},
	});
};
