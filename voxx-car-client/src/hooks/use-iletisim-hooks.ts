import {
	createIletisim,
	deleteIletisim,
	getIletisimByFirmaId,
	updateIletisim,
} from "@/requests/iletisim";
import type { CreateIletisimRequest, Iletisim } from "@/schemas/iletisim";
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export function getIletisimlerByFirmaIdQueryOptions(firmaId: string) {
	return queryOptions({
		queryKey: ["firma", { firmaId }, "iletisim"],
		queryFn: () => getIletisimByFirmaId(firmaId),
	});
}

export const useCreateIletisimMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (iletisim: CreateIletisimRequest): Promise<void> =>
			await createIletisim(iletisim),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateIletisimMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (iletisim: Iletisim) => await updateIletisim(iletisim),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteIletisimMutation = (
	firmaId: string,
	onSuccess?: () => void,
) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteIletisim(id),
		async onSuccess() {
			onSuccess?.();
			await queryClient.invalidateQueries(
				getIletisimlerByFirmaIdQueryOptions(firmaId),
			);
		},
	});
};
