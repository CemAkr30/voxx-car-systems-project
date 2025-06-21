import {
	createAdres,
	deleteAdres,
	getAdresByFirmaId,
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

export function getAdreslerByFirmaIdQueryOptions(firmaId: string) {
	return queryOptions({
		queryKey: ["firma", { firmaId }, "adres"],
		queryFn: () => getAdresByFirmaId(firmaId),
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
