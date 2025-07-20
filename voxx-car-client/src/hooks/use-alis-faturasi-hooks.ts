import {
	createAlisFaturasi,
	deleteAlisFaturasi,
	getAlisFaturasiByAracFiloId,
	updateAlisFaturasi,
} from "@/requests/alis-faturasi";
import type {
	AlisFaturasi,
	CreateAlisFaturasiRequest,
} from "@/schemas/alis-faturasi";
import { queryOptions, useMutation } from "@tanstack/react-query";

export function getAlisFaturasiByAracFiloIdQueryOptions(aracFiloId: string) {
	return queryOptions({
		queryKey: ["aracFilo", { aracFiloId }, "alisFaturasi"],
		queryFn: () => getAlisFaturasiByAracFiloId(aracFiloId),
	});
}

export const useCreateAlisFaturasiMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (
			alisFaturasi: CreateAlisFaturasiRequest,
		): Promise<void> => await createAlisFaturasi(alisFaturasi),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateAlisFaturasiMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (alisFaturasi: AlisFaturasi) =>
			await updateAlisFaturasi(alisFaturasi),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteAlisFaturasiMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (id: string) => await deleteAlisFaturasi(id),
		onSuccess() {
			onSuccess?.();
		},
	});
};
