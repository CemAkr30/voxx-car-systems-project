import {
	createMarka,
	deleteMarka,
	getAllMarka,
	updateMarka,
} from "@/requests/marka";
import type { CreateMarkaRequest, Marka } from "@/schemas/marka";
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export function getMarkalarQueryOptions() {
	return queryOptions({
		queryKey: ["markalar"],
		queryFn: getAllMarka,
	});
}

export const useCreateMarkaMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (marka: CreateMarkaRequest): Promise<void> => {
			await createMarka(marka);
		},
		onSuccess() {
			queryClient.invalidateQueries(getMarkalarQueryOptions());
			onSuccess?.();
		},
	});
};

export const useUpdateMarkaMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (marka: Marka) => {
			await updateMarka(marka);
		},
		onSuccess() {
			queryClient.invalidateQueries(getMarkalarQueryOptions());
			onSuccess?.();
		},
	});
};

export const useDeleteMarkaMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await deleteMarka(id);
		},
		onSuccess() {
			queryClient.invalidateQueries(getMarkalarQueryOptions());
			onSuccess?.();
		},
	});
};
