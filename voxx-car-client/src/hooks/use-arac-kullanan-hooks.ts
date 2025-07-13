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
import { queryOptions, useMutation } from "@tanstack/react-query";

export function getAracKullananlarByFirmaIdQueryOptions(firmaId: string) {
	return queryOptions({
		queryKey: ["firma", { firmaId }, "arac-kullananlar"],
		queryFn: () => getAllAracKullananlarByFirmaId(firmaId),
	});
}
export const useCreateAracKullananMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (
			aracKullanan: CreateAracKullananRequest,
		): Promise<void> => await createAracKullanan(aracKullanan),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateAracKullananMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (aracKullanan: AracKullanan) =>
			await updateAracKullanan(aracKullanan),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteAracKullananMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (id: string) => await deleteAracKullanan(id),
		onSuccess() {
			onSuccess?.();
		},
	});
};
