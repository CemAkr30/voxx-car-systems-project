import {
	createMtv,
	deleteMtv,
	getAllMtv,
	getMtvByAracFiloId,
	updateMtv,
} from "@/requests/mtv";
import type { CreateMtvRequest, Mtv } from "@/schemas/mtv";
import { queryOptions, useMutation } from "@tanstack/react-query";

export function getMtvlerQueryOptions() {
	return queryOptions({
		queryKey: ["dashboard", "mtv"],
		queryFn: () => getAllMtv(),
	});
}

export function getMtvlerByAracFiloIdQueryOptions(aracFiloId: string) {
	return queryOptions({
		queryKey: ["aracFilo", { aracFiloId }, "mtv"],
		queryFn: () => getMtvByAracFiloId(aracFiloId),
	});
}

export const useCreateMtvMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (mtv: CreateMtvRequest): Promise<void> =>
			await createMtv(mtv),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateMtvMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (mtv: Mtv) => await updateMtv(mtv),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteMtvMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (id: string) => await deleteMtv(id),
		onSuccess() {
			onSuccess?.();
		},
	});
};
