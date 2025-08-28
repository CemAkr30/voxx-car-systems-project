import {
	createFirma,
	deleteFirma,
	getAllFirma,
	getFirma,
	updateFirma,
} from "@/requests/firma";
import type { CreateFirmaRequest, Firma } from "@/schemas/firma";
import { queryOptions, useMutation } from "@tanstack/react-query";

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
	return useMutation({
		mutationFn: async (firma: CreateFirmaRequest): Promise<void> =>
			await createFirma(firma),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateFirmaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (firma: Firma) => await updateFirma(firma),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteFirmaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (id: string) => await deleteFirma(id),
		onSuccess() {
			onSuccess?.();
		},
	});
};
