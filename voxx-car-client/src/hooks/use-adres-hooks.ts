import {
	createAdres,
	deleteAdres,
	getAllAdres,
	updateAdres,
} from "@/requests/adres";
import type { CreateAdresRequest, Adres } from "@/schemas/adres";
import {
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";

export function getAdreslerQueryOptions() {
	return queryOptions({
		queryKey: ["adresler"],
		queryFn: getAllAdres,
	});
}

export function getAdresQueryOptions(firmaId: string) {
	return queryOptions({
		queryKey: ["adres", { firmaId }],
		queryFn: getAllAdres,
	});
}

export const useAdreslerQuery = () =>
	useSuspenseQuery(getAdreslerQueryOptions());

export const useCreateAdresMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (adres: CreateAdresRequest): Promise<void> => {
			await createAdres(adres);
		},
		onSuccess() {
			queryClient.refetchQueries({
				queryKey: getAdreslerQueryOptions().queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: getAdreslerQueryOptions().queryKey,
			});
			onSuccess?.();
		},
	});
};

export const useUpdateAdresMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (adres: Adres) => await updateAdres(adres),
		onSuccess() {
			queryClient.refetchQueries({
				queryKey: getAdreslerQueryOptions().queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: getAdreslerQueryOptions().queryKey,
			});
			onSuccess?.();
		},
	});
};

export const useDeleteAdresMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteAdres(id),
		onSuccess() {
			queryClient.refetchQueries({
				queryKey: getAdreslerQueryOptions().queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: getAdreslerQueryOptions().queryKey,
			});
			onSuccess?.();
		},
	});
};
