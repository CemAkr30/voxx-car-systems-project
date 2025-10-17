import {
	createAracKirala,
	deleteAracKirala,
	getKiralanabilirAracFilolar,
	getKiralayanFirmalarByAracFiloId,
	getKiralikAracFilolarByFirmaId,
	updateAracKirala,
} from "@/requests/arac-kirala";
import type { CreateAracKiralaRequest } from "@/schemas/arac-kirala";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

export function getKiralanabilirAracFilolarQueryOptions() {
	return queryOptions({
		queryKey: ["arac-filo", "kiralanabilir"],
		queryFn: () => getKiralanabilirAracFilolar(),
	});
}

export function getKiralananAracFilolarByFirmaIdQueryOptions(firmaId: string) {
	return queryOptions({
		queryKey: ["arac-filo", { firmaId }, "firma"],
		queryFn: () => getKiralikAracFilolarByFirmaId(firmaId),
	});
}

export function getFirmalarByAracFiloIdQueryOptions(aracFiloId: string) {
	return queryOptions({
		queryKey: ["firma", { aracFiloId }, "arac-filo"],
		queryFn: () => getKiralayanFirmalarByAracFiloId(aracFiloId),
	});
}

export const useCreateAracKiralaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (aracFilo: CreateAracKiralaRequest): Promise<void> =>
			await createAracKirala(aracFilo),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateAracKiralaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async ({ id, data }: { id: string; data: CreateAracKiralaRequest }): Promise<void> =>
			await updateAracKirala(id, data),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteAracKiralaMutation = (
	firmaId: string,
	onSuccess?: () => void,
) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteAracKirala(id),
		async onSuccess() {
			onSuccess?.();
			await queryClient.invalidateQueries(
				getKiralananAracFilolarByFirmaIdQueryOptions(firmaId),
			);
		},
	});
};
