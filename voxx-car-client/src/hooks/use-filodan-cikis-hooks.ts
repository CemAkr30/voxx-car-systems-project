import {
	createFilodanCikis,
	deleteFilodanCikis,
	getFilodanCikisByAracFiloId,
	updateFilodanCikis,
} from "@/requests/filodan-cikis";
import type {
	CreateFilodanCikisRequest,
	FilodanCikis,
} from "@/schemas/filodan-cikis";
import { queryOptions, useMutation } from "@tanstack/react-query";

export function getFilodanCikisByAracFiloIdQueryOptions(aracFiloId: string) {
	return queryOptions({
		queryKey: ["aracFilo", { aracFiloId }, "filodanCikis"],
		queryFn: () => getFilodanCikisByAracFiloId(aracFiloId),
	});
}

export const useCreateFilodanCikisMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (
			filodanCikis: CreateFilodanCikisRequest,
		): Promise<void> => await createFilodanCikis(filodanCikis),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateFilodanCikisMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (filodanCikis: FilodanCikis) =>
			await updateFilodanCikis(filodanCikis),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteFilodanCikisMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (id: string) => await deleteFilodanCikis(id),
		onSuccess() {
			onSuccess?.();
		},
	});
};
