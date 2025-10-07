import {
	createAdres,
	deleteAdres,
	getAdresByFirmaId,
	updateAdres,
} from "@/requests/adres";
import type { CreateAdresRequest, Adres } from "@/schemas/adres";
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export function getAdreslerByFirmaIdQueryOptions(firmaId: string) {
	return queryOptions({
		queryKey: ["firma", { firmaId }, "adres"],
		queryFn: () => getAdresByFirmaId(firmaId),
	});
}

export const useCreateAdresMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (adres: CreateAdresRequest): Promise<void> =>
			await createAdres(adres),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateAdresMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (adres: Adres) => await updateAdres(adres),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteAdresMutation = (
	firmaId: string,
	onSuccess?: () => void,
) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteAdres(id),
		async onSuccess() {
			onSuccess?.();
			await queryClient.invalidateQueries(
				getAdreslerByFirmaIdQueryOptions(firmaId),
			);
		},
	});
};
