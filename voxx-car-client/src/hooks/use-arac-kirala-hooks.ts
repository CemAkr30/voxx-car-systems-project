import {
	createAracKirala,
	getKiralayanFirmalarByAracFiloId,
	getKiralikAracFilolarByFirmaId,
} from "@/requests/arac-kirala";
import type { CreateAracKiralaRequest } from "@/schemas/arac-kirala";
import { queryOptions, useMutation } from "@tanstack/react-query";

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
