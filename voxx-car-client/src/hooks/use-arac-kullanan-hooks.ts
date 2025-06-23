import {
	createAracKullanan,
	deleteAracKullanan,
	getAllAracKullananlarByFirmaId,
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
} from "@tanstack/react-query";

export function getAracKullananlarByFirmaIdQueryOptions(firmaId: string) {
	return queryOptions({
		queryKey: ["firma", { firmaId }, "arac-kullananlar"],
		queryFn: () => getAllAracKullananlarByFirmaId(firmaId),
	});
}
export const useCreateAracKullananMutation = (
	firmaId: string,
	onSuccess?: () => void,
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (
			aracKullanan: CreateAracKullananRequest,
		): Promise<void> => {
			await createAracKullanan(aracKullanan);
		},
		onSuccess() {
			queryClient.refetchQueries({
				queryKey: getAracKullananlarByFirmaIdQueryOptions(firmaId).queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: getAracKullananlarByFirmaIdQueryOptions(firmaId).queryKey,
			});
			onSuccess?.();
		},
	});
};

export const useUpdateAracKullananMutation = (
	firmaId: string,
	onSuccess?: () => void,
) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (aracKullanan: AracKullanan) =>
			await updateAracKullanan(aracKullanan),
		onSuccess() {
			queryClient.refetchQueries({
				queryKey: getAracKullananlarByFirmaIdQueryOptions(firmaId).queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: getAracKullananlarByFirmaIdQueryOptions(firmaId).queryKey,
			});
			onSuccess?.();
		},
	});
};

export const useDeleteAracKullananMutation = (
	firmaId: string,
	onSuccess?: () => void,
) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteAracKullanan(id),
		onSuccess() {
			queryClient.refetchQueries({
				queryKey: getAracKullananlarByFirmaIdQueryOptions(firmaId).queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: getAracKullananlarByFirmaIdQueryOptions(firmaId).queryKey,
			});
			onSuccess?.();
		},
	});
};
