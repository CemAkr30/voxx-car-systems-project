import {
	createMarka,
	deleteMarka,
	getAllMarka,
	updateMarka,
} from "@/requests/marka";
import type { CreateMarkaRequest, Marka } from "@/schemas/marka";
import { queryOptions, useMutation } from "@tanstack/react-query";

export function getMarkalarQueryOptions() {
	return queryOptions({
		queryKey: ["markalar"],
		queryFn: getAllMarka,
	});
}

export const useCreateMarkaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (marka: CreateMarkaRequest): Promise<void> =>
			await createMarka(marka),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateMarkaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (marka: Marka) => await updateMarka(marka),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteMarkaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (id: string) => await deleteMarka(id),
		onSuccess() {
			onSuccess?.();
		},
	});
};
