import {
	createAracKullanan,
	deleteAracKullanan,
	getAllAracKullanan,
	updateAracKullanan,
} from "@/requests/arac-kullanan";
import type {
	CreateAracKullananRequest,
	AracKullanan,
} from "@/schemas/arac-kullanan";
import {
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";

export function getAracKullananlerQueryOptions() {
	return queryOptions({
		queryKey: ["aracKullananler"],
		queryFn: getAllAracKullanan,
	});
}

export function getAracKullananQueryOptions(firmaId: string) {
	return queryOptions({
		queryKey: ["aracKullanan", { firmaId }],
		queryFn: getAllAracKullanan,
	});
}

export const useAracKullananlerQuery = () =>
	useSuspenseQuery(getAracKullananlerQueryOptions());

export const useCreateAracKullananMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (
			aracKullanan: CreateAracKullananRequest,
		): Promise<void> => {
			await createAracKullanan(aracKullanan);
		},
		onSuccess() {
			queryClient.refetchQueries({
				queryKey: getAracKullananlerQueryOptions().queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: getAracKullananlerQueryOptions().queryKey,
			});
			onSuccess?.();
		},
	});
};

export const useUpdateAracKullananMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (aracKullanan: AracKullanan) =>
			await updateAracKullanan(aracKullanan),
		onSuccess() {
			queryClient.refetchQueries({
				queryKey: getAracKullananlerQueryOptions().queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: getAracKullananlerQueryOptions().queryKey,
			});
			onSuccess?.();
		},
	});
};

export const useDeleteAracKullananMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteAracKullanan(id),
		onSuccess() {
			queryClient.refetchQueries({
				queryKey: getAracKullananlerQueryOptions().queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: getAracKullananlerQueryOptions().queryKey,
			});
			onSuccess?.();
		},
	});
};
