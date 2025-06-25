import {
	createFirma,
	deleteFirma,
	getAllFirma,
	getFirma,
	updateFirma,
} from "@/requests/firma";
import type { CreateFirmaRequest, Firma } from "@/schemas/firma";
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export function getFirmalarQueryOptions() {
	return queryOptions({
		queryKey: ["firmalar"],
		queryFn: getAllFirma,
	});
}

export function getFirmaQueryOptions(firmaId: string) {
	return queryOptions({
		queryKey: ["firma", { firmaId }],
		queryFn: () => getFirma(firmaId),
	});
}

export const useCreateFirmaMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (firma: CreateFirmaRequest): Promise<void> => {
			await createFirma(firma);
		},
		onSuccess() {
			queryClient.invalidateQueries(getFirmalarQueryOptions());
			onSuccess?.();
		},
	});
};

export const useUpdateFirmaMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (firma: Firma) => {
			await updateFirma(firma);
			await queryClient.invalidateQueries(getFirmaQueryOptions(firma.id));
		},
		onSuccess() {
			queryClient.invalidateQueries(getFirmalarQueryOptions());
			onSuccess?.();
		},
	});
};

export const useDeleteFirmaMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteFirma(id),
		onSuccess() {
			queryClient.invalidateQueries(getFirmalarQueryOptions());
			onSuccess?.();
		},
	});
};
